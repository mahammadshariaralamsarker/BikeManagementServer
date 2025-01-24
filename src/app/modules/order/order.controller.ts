import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { BikeModel } from "../bike/bike.model";
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const id = order.product;
    const findData = await BikeModel.findById(id);
    if (findData) {
      const findDataQuantity = findData.quantity;
      const orderQuantity = order.quantity;
      
      if (findDataQuantity > orderQuantity) {
        await BikeModel.findByIdAndUpdate( id, { quantity: findDataQuantity - orderQuantity }, { new: true });
        const result = await OrderService.createOrderIntoDB(order);
        res.send({
          status:true,
          message:"Order created successfully",
          data:result
        })
      }
      else if(findDataQuantity<orderQuantity){
        throw new Error (`${orderQuantity} Product is not available in stock`)
      } 
      else if (findDataQuantity==0) {
        await BikeModel.findByIdAndUpdate( id, { inStock: false }, { new: true });
      }
    }
  } catch (error:any) {
    res.status(404).send({
      status:false,
      message:error.message 
    })
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrderFromDB();
    const taka = result.reduce((total, order) => total + order.totalPrice, 0);
    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: {
        totalRevenue: taka,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).send({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrder,
};
