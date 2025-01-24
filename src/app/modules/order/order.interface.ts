import mongoose from "mongoose";

export interface Order {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
