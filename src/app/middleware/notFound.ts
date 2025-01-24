/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
   res.status(StatusCodes.BAD_REQUEST).json({
    status: false,
    message: 'API Not Found',
    error: '',
  });
};
