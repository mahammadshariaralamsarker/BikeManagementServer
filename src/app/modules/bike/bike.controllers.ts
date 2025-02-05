 
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.services';

// Create Bi Cycle Controllers
const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.BikeDataSaveToDatabase(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike Created Successful',
    data: result,
  });
});

// Get All Bi Cycle Controller
const allBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeDataFromDatabase(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

// Get Specific Field Controller
const getSpecificField = catchAsync(async (req, res) => {
  const result = await BikeServices.getSpecificFieldCycleDataFromDatabase();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike Specific Field retrieved successfully',
    data: result,
  });
});

// Get Single Bi Cycle
const singleBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getSingleBikeDataFromDatabase(
    req.params.productId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

// Update Single Bi Cycle
const updateSingleBike = catchAsync(async (req, res) => {
  const result = await BikeServices.singleBikeDataUpdateFromDatabase(
    req.params.productId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

// Delete Single Bi Cycle Controller

const deleteSingleBike = catchAsync(async (req, res) => {
  const result = await BikeServices.singleBikeDataDeleteFromDatabase(
    req.params.productId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});

// Export Controllers
export const BikeControllers = {
  createBike,
  allBike,
  singleBike,
  updateSingleBike,
  deleteSingleBike,
  getSpecificField,
};
