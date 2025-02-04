import { Router } from 'express';
import { BikeRoutes } from '../modules/Bikes/Bike.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRouter } from '../modules/auth/auth.routes';
import { OrderRoutes } from '../modules/order/order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/Bike',
    route: BikeRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
