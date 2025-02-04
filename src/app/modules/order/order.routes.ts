import express from 'express';

import auth from '../../middlewares/authChecking';
import { OrderControllers } from './order.controllers';
import requestValidation from '../../middlewares/requestValidation';
import { OrderValidationSchemas } from './order.validationSchemas';

// Init Router
const orderRouter = express.Router();

//Get All Bike
orderRouter.post(
  '/create',
  requestValidation(OrderValidationSchemas.createOrderValidationSchema),
  auth('customer'),
  OrderControllers.createOrder,
);
// Update Order Delivery Status
orderRouter.patch(
  '/delivery/status/:orderId',
  auth('admin'),
  OrderControllers.updateOrderDeliveryStatus,
);
//Verify Payment
orderRouter.get('/verify', auth('customer'), OrderControllers.orderverfy);
// Get All Logged in User Orders
orderRouter.get('/all', auth('customer'), OrderControllers.getOrders);
// Get All Orders
orderRouter.get(
  '/all-orders',
  auth('admin'),
  OrderControllers.getOrdersForAdmin,
);

// Delete Single Orders
orderRouter.delete(
  '/delete/:orderId',
  auth('admin'),
  OrderControllers.deleteOrder,
);

// Update Single Orders
orderRouter.patch(
  '/update/:orderId',
  requestValidation(OrderValidationSchemas.updateOrderValidationSchema),
  auth('customer'),
  OrderControllers.updateOrder,
);
// Export Bi-Cycle Router
export const OrderRoutes = orderRouter;
