import express from 'express';
import { BikeControllers } from './Bike.controllers';
import requestValidation from '../../middlewares/requestValidation';
import { BikeValidationSchemas } from './Bike.validation.schemas';
import auth from '../../middlewares/authChecking';
// import auth from '../../middlewares/authChecking';

// Init Router
const router = express.Router();
// Create Bike
router.post(
  '/',
  auth('admin'),
  requestValidation(BikeValidationSchemas.createBikeValidationSchema),
  BikeControllers.createBike,
);
//Get All Bike
router.get('/', BikeControllers.allBike);
router.get('/specific', BikeControllers.getSpecificField);
// Get Single Bike
router.get('/:productId', BikeControllers.singleBike);
// Update Single Bike
// router.put('/:productId', BikeControllers.updateSingleBike);
router.patch(
  '/:productId',
  auth('admin'),
  requestValidation(BikeValidationSchemas.updateBikeValidationSchema),
  BikeControllers.updateSingleBike,
);
// Delete Single Bike
router.delete('/:productId', auth('admin'), BikeControllers.deleteSingleBike);

// Export Bi-Cycle Router
export const BikeRoutes = router;
