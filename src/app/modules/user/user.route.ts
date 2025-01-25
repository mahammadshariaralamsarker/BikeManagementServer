import express from "express";
import { createUserValidationSchema } from "../user/user.validation"; 
import { validateRequest } from "../../middleware/validateRequest";
 
import { authController } from "../auth/auth.controller";
import { LoginAuthValidationSchema } from "../auth/auth.validation";
 

const router = express.Router();


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

export const UserRoute = router;
