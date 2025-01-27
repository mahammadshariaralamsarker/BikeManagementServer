import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/app.error";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status-codes";
import config from "../../config";

const userCreateAccount = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) throw new AppError(httpStatus.NOT_FOUND, "Validation error");
  const result = await AuthService.createUserIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const data = req.body;
  if (!data) throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials");
  const result = await AuthService.loginUserIntoDB(data);
  const { refreshToken, token } = result; 
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Login successful",
    data: { token: token },
  });
});

const changePassword = catchAsync(async (req, res) => {
 
  const id = req.params.userId;
  const data = req.body;
  const result = await AuthService.changePassword(id, data);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});
export const authController = {refreshToken, userCreateAccount, userLogin, changePassword };
