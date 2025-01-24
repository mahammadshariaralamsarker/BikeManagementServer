 
import httpStatus from 'http-status-codes'
import { TUser } from "./user.interface"
import { UserModel } from "./user.model";
import AppError from '../../../error/app.error';


const updateUserIntoDB = async (payload: Partial<TUser>, Id: string) => {
    const result = await UserModel.findOneAndUpdate({ _id: Id }, payload, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}
const blockUserIntoDB = async (Id: string) => {
    const result = await UserModel.findOneAndUpdate({ _id: Id }, { isBlocked: true }, { new: true });
    if (!result) throw new AppError(httpStatus.NOT_FOUND, "Invalid User Infomation")
    return result;
}


export const UserService = {
    updateUserIntoDB,blockUserIntoDB
}