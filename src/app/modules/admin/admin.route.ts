import express from "express";

import { blockUserValidationSchema } from "../user/user.validation";

import { userController } from "../user/auth.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { bikeController } from "../bike/bike.controller";

const router = express.Router();

// route
// block user route
router.patch(
  "/user/:userId/block",
  auth.authUser,
  auth.onlyAdmin,
  validateRequest(blockUserValidationSchema),
  userController.userBlockUpdate
);
//  admin Product Operation
router.post(
  "/products",
  auth.authUser,
  auth.onlyAdmin,
  bikeController.createBike
);
router.delete(
  "/products/:productId",
  auth.authUser,
  auth.onlyAdmin,
  bikeController.deleteBike
);
router.put(
  "/products/:productId",
  auth.authUser,
  auth.onlyAdmin,
  bikeController.updateBike
);
export const AdminRoute = router;
