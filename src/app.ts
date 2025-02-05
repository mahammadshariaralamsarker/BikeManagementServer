import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();
import cookieParser from 'cookie-parser';
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173',],
    credentials: true,
  }),
);
// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Bike Server Is Running...!',
  });
});

// Handle Global Error
app.use(globalErrorHandler);
app.use(notFound);

export default app;
