import express from "express";

import { blockUserValidationSchema } from "../user/user.validation";

import { userController } from "../user/auth.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

// route
router.patch(
  "/user/:userId/block",
  auth.authUser,
  auth.onlyAdmin,
  validateRequest(blockUserValidationSchema),
  userController.userBlockUpdate
);

// router.delete('/blogs/:Id', auth.authUser, auth.onlyAdmin, blogController.blogDelete)

export const AdminRoute = router;
