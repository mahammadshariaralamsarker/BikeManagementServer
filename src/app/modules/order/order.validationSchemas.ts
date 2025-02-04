import { z } from 'zod';
import { OrderDeliveryStatus } from './order.constant';

// Create Order Validation Schema
const createOrderValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product: z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), {
          message: 'Invalid ObjectId format for product',
        }),
        quantity: z
          .number()
          .int()
          .positive('Quantity must be a positive integer'),
      }),
    ),
  }),
});

const updateOrderValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product: z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), {
          message: 'Invalid ObjectId format for product',
        }),
        quantity: z
          .number()
          .int()
          .positive('Quantity must be a positive integer'),
      }),
    ),
  }),
});

const updateOrderDeliveryStatusValidationSchema = z.object({
  body: z.object({
    deliveryStatus: z.string(),
  }),
});
export const OrderValidationSchemas = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
  updateOrderDeliveryStatusValidationSchema,
};
