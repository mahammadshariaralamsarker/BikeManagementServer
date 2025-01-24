import express from "express";
import { createUserValidationSchema } from "../user/user.validation";
import { LoginAuthValidationSchema } from "./auth.validation";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

// route
router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  authController.userCreateAccount
);
router.post(
  "/login",
  validateRequest(LoginAuthValidationSchema),
  authController.userLogin
);

export const AuthRoute = router;
