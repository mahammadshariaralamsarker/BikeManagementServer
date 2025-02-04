import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.services';

// Create Bi Cycle Order Controllers
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.orderSaveToDatabase(
    req.body,
    req.user,
    req.ip,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Created Successful',
    data: result,
  });
});

// Order Verify Controllers
const orderverfy = catchAsync(async (req, res) => {
  const result = await OrderServices.verifyPayment(req.query.orderId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Verified Successful',
    data: result,
  });
});

//Get Order Controllers
const getOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrder(req.user.userEmail);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Retrieved Successful',
    data: result,
  });
});

//Get All Order Controllers
const getOrdersForAdmin = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrderForAdmin(req.user.userEmail);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Retrieved Successful',
    data: result,
  });
});
//Update Order Controllers
const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrderFromoDatabase(
    req.body,
    req.user,
    req.ip,
    req.params.orderId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Updated Successful',
    data: result,
  });
});

//Update Order Deliveru Status
const updateOrderDeliveryStatus = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrderDeliveryStatusFromoDatabase(
    req.body?.deliveryStatus,
    req.params.orderId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Delivery Status Updated Successful',
    data: result,
  });
});
// Create Bi Cycle Controllers
const deleteOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.deleteOrderFromDatabase(
    req.params.orderId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Deleted Successful',
    data: result,
  });
});
// Export Controllers
export const OrderControllers = {
  createOrder,
  orderverfy,
  getOrders,
  deleteOrder,
  updateOrder,
  getOrdersForAdmin,
  updateOrderDeliveryStatus,
};
