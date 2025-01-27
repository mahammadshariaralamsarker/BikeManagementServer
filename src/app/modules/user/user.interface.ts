import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  isBlocked: boolean;
};
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
export type TPassword = {
  currentPassword: string;
  newPassword: string;
};
