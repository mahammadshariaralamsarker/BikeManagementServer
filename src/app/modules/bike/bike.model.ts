import { model, Schema } from "mongoose";
import { Bike, BikeCategory } from "./bike.interface";

const bikeSchema = new Schema<Bike>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min:[0,"Price must be a positive number"]
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(BikeCategory)
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    }
  },
  { 
    timestamps: true ,
    versionKey:false
  },
  
);

export const BikeModel = model<Bike>("Bike", bikeSchema);
