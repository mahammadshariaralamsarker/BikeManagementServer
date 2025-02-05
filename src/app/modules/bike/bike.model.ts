import { model, Schema } from 'mongoose';
import { TBike } from './bikeInterface';

// Create Bi Cycle Schema
const BikeSchema = new Schema<TBike>(
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
    },

    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
    },
    productDetails: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export Model
export const Bike = model<TBike>('Bike', BikeSchema);
