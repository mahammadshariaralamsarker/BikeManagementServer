/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';
const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!,
);

// Make Payment
const makePaymentAsync = async (
  orderPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      orderPayload,
      (res) => resolve(res),
      (err) => reject(err),
    );
  });
};

// Payment Verify
const verifyPaymentAsync = (
  order_id: string,
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (res) => resolve(res),
      (err) => reject(err),
    );
  });
};

export const OrderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
