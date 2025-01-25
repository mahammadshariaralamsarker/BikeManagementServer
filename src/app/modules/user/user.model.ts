import { model, Schema } from "mongoose";
import { TPassword, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser, TPassword>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: 0,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin", "customer"],
      default: "customer",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
 
// create hash password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser>("User", userSchema);
