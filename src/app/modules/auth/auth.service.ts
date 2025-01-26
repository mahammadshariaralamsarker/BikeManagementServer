import jwt, { JwtPayload } from "jsonwebtoken";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TChangePassword, TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import config from "../../config";
import AppError from "../../error/app.error"; 

const JWT_SECRET = config.jwt_access_secret as string;
const createUserIntoDB = async (payload: TUser) => {
  const result = new User(payload);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Validation error");
  await result.save();
  return result;
};
const loginUserIntoDB = async (payload: TLogin) => {
  const { email, password } = payload;
  if (!email || !password)
    throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials!");

  const user = await User.findOne({ email: email }).select("+password");
  if (!user)
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Invalid ${email} no record create !`
    );
  const isDeleted = user?.isBlocked;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }
  // Compare provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user?.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password!");
  }
  const token = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: "10d" });
  return { token, refreshToken };
};
const changePassword = async (id: string, payload: TChangePassword) => {
  // checking if the user is exist
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  await User.findByIdAndUpdate(id, { password: newHashedPassword });
};

export const AuthService = {
  createUserIntoDB,
  loginUserIntoDB,
  changePassword,
};
