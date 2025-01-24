import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt' 
import config from "../../config";
const userSchema = new Schema<TUser>({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: 0,
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'customer'],
        default: 'customer',
    },
     
}, { timestamps: true });


// create hes password
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})

// create hes password

export const UserModel = model<TUser>('User', userSchema)