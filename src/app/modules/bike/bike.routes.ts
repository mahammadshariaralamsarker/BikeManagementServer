import express from 'express'; 
import requestValidation from '../../middlewares/requestValidation'; 
import auth from '../../middlewares/authChecking';
import { BikeValidationSchemas } from './bike.validation.schemas';
import { BikeControllers } from './bike.controllers'; 

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
