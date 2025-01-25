import express from "express";
import { blockUserValidationSchema } from "../user/user.validation";
import { userController } from "../user/auth.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest"; 

const router = express.Router();

// block user route
router.patch(
  "/user/:userId/block",
  auth.authUser,
  auth.onlyAdmin,
  validateRequest(blockUserValidationSchema),
  userController.userBlockUpdate
);


export const AdminRoute = router;
