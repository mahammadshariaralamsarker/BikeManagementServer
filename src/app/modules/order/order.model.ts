import mongoose, { model, Schema } from "mongoose";
import { Order } from "./order.interface";

const ordersSchema = new Schema<Order>({
        email:{
            type:String,
            required:true, 
        },
        
        totalPrice:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Bike'}, 
    },
    {
        timestamps:true,
        versionKey:false 
    })

export const OrderModel = model<Order>("Order",ordersSchema)