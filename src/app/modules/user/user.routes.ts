import express from 'express';
import requestValidation from '../../middlewares/requestValidation';
import { UserValidationSchemas } from './user.validation.schema';
import { UserControllers } from './user.controllers';
import auth from '../../middlewares/authChecking';

// Init Router
const userRouter = express.Router();
// Create User
userRouter.post(
  '/',
  requestValidation(UserValidationSchemas.createUserValidationSchema),
  UserControllers.createUser,
);

// Get All User
userRouter.get('/', auth('admin'), UserControllers.getAllUser);
userRouter.patch('/update', auth('admin'), UserControllers.updateUser);

// Export User Router
export const UserRoutes = userRouter;
