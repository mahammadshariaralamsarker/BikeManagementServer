import express from 'express';
import { AuthControllers } from './auth.controllers';
import auth from '../../middlewares/authChecking';
import requestValidation from '../../middlewares/requestValidation';
import { UserValidationSchemas } from '../user/user.validation.schema';

// Init Router
const authRouter = express.Router();
// Auth Login
authRouter.post('/login', AuthControllers.loginUser);
authRouter.get('/logout', AuthControllers.logoutUser);
authRouter.patch(
  '/update',
  auth('admin', 'customer'),
  requestValidation(UserValidationSchemas.updateUserValidationSchema),
  AuthControllers.updateUserInfo,
);
authRouter.get('/me', auth('admin', 'customer'), AuthControllers.getMe);

export const AuthRouter = authRouter;
