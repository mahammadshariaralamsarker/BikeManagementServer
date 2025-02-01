import express from "express";
import { bikeController } from "./bike.controller";
import { auth } from "../../middleware/auth";
const router = express.Router();

// general route
router.get("/products/:productId", bikeController.getSingleBike);
router.get("/products", 
    bikeController.getBike);
 
//  admin Product Operation
router.post(
  "/products",
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
export const bikeRoutes = router;
