/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { User } from './user.model';

// User Save To Database
const userSaveToDatabase = async (userInfo: TUser) => {
  const user = await User.create(userInfo);

  return user;
};


// User Save To Database
const usergetFromDatabase = async () => {
  const user = await User.find();

  return user;
};
// User Update To Database
const userUpdateFromDatabase = async (data:{status:string, id:string}) => {
  const user = await User.findByIdAndUpdate(data?.id, { status: data?.status }, {new:true});

  return user;
};
export const UserServices = {
  userSaveToDatabase,
  usergetFromDatabase,
  userUpdateFromDatabase,
};
