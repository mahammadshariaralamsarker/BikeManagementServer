import { JwtPayload } from 'jsonwebtoken';
import { IOrder } from './order.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { Bike } from '../Bikes/Bike.model';
import Order from './order.model';
import { OrderUtils } from './order.utils';

// Bi Cycle Data Save to Database
const orderSaveToDatabase = async (
  orderInfo: Partial<IOrder>,
  userInfo: JwtPayload,
  client_ip: string | undefined,
) => {
  const user = await User.findOne({ email: userInfo?.userEmail });
  //Check Products
  if (!orderInfo.products?.length) {
    throw new AppError(400, 'Order is not specified');
  }

  // Calculate Price
  const products = orderInfo.products;
  let totalPrice = 0;
  const orderDetails = await Promise.all(
    products?.map(async (item) => {
      const Bike = await Bike.findById(item.product);
      if ((Bike?.stock as number) < item?.quantity) {
        throw new AppError(400, 'Insufficient Stock!');
      }
      if (Bike) {
        const subTotal = Bike ? (Bike.price || 0) * item.quantity : 0;
        totalPrice += subTotal;
        // Stock Decreament
        Bike.stock -= item.quantity;
        await Bike.save();
        return item;
      }
    }),
  );

  let order = await Order.create({
    user: user?._id,
    products: orderDetails,
    totalPrice,
  });

  // Payment Payload
  const orderPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: user?.phone,
    customer_city: user?.city,
    client_ip,
  };
  const payment = await OrderUtils.makePaymentAsync(orderPayload);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transaction_status: payment.transactionStatus,
      },
    });
  }
  return payment?.checkout_url;
};

const verifyPayment = async (orderId: string) => {
  const verifiedPayment = await OrderUtils.verifyPaymentAsync(orderId);
  // Update Order Status
  if (verifiedPayment?.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': orderId,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transaction_status': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0]?.bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0]?.bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0]?.bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }
  return verifiedPayment;
};

// Get Orders
const getOrder = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(400, 'User Not Found');
  }
  const orders = await Order.find({ user: user._id });

  return orders;
};

// Get Orders
const getOrderForAdmin = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(400, 'User Not Found');
  }
  const orders = await Order.find().populate('user');

  return orders;
};

// Bi Cycle Delivery Status Update from Database
const updateOrderDeliveryStatusFromoDatabase = async (
  statusInfo: string,
  orderId: string,
) => {
  // Check Order
  const isExistOrder = await Order.findById(orderId);
  if (!isExistOrder) {
    throw new AppError(404, 'Order not Found');
  }
  // Update Status
  const result = await Order.findByIdAndUpdate(
    orderId,
    { deliveryStatus: statusInfo },
    { new: true },
  );

  return result;
};
// Bi Cycle Data Save to Database
const updateOrderFromoDatabase = async (
  orderInfo: Partial<IOrder>,
  userInfo: JwtPayload,
  client_ip: string | undefined,
  orderId: string,
) => {
  const user = await User.findOne({ email: userInfo?.userEmail });
  //Check Products
  if (!orderInfo.products?.length) {
    throw new AppError(400, 'Order is not specified');
  }

  // Check Order
  const isExistOrder = await Order.findById(orderId);
  if (!isExistOrder) {
    throw new AppError(404, 'Order is not Found');
  }
  // Check Order Status
  if (isExistOrder?.status === 'Paid') {
    throw new AppError(
      400,
      'You Cannot Update This Order Because This Order Already Paid',
    );
  }

  // Calculate Price
  const products = orderInfo.products;
  let totalPrice = 0;
  const orderDetails = await Promise.all(
    products?.map(async (item) => {
      const Bike = await Bike.findById(item.product);
      if (Bike) {
        const subTotal = Bike ? (Bike.price || 0) * item.quantity : 0;
        totalPrice += subTotal;
        return item;
      }
    }),
  );
  let order = await Order.findByIdAndUpdate(orderId, {
    user: user?._id,
    products: orderDetails,
    totalPrice,
  });

  // Payment Payload
  const orderPayload = {
    amount: totalPrice,
    order_id: order?._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: user?.phone,
    customer_city: user?.city,
    client_ip,
  };
  const payment = await OrderUtils.makePaymentAsync(orderPayload);
  if (payment?.transactionStatus) {
    order = await order?.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transaction_status: payment.transactionStatus,
      },
    });
  }
  return payment?.checkout_url;
};

// Get Orders
const deleteOrderFromDatabase = async (id: string) => {
  const orders = await Order.findByIdAndDelete(id);

  return orders;
};
export const OrderServices = {
  orderSaveToDatabase,
  verifyPayment,
  getOrder,
  deleteOrderFromDatabase,
  updateOrderFromoDatabase,
  getOrderForAdmin,
  updateOrderDeliveryStatusFromoDatabase,
};
