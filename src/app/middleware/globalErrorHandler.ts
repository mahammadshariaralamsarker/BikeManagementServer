/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';  
import { TErrorSources } from '../../interface/error';
import { handleZodError } from '../../error/handleZodError';
import { handleCastValidationError } from '../../error/handleCastError';
import AppError from '../../error/app.error';  

export const globalErrorHandler: ErrorRequestHandler = (
  err,
req,res,next
)=> {
  // setting getting values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Error Sources message',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }   else if (err.name === 'CastError') {
    const simplifiedError = handleCastValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
  } 
   res.status(statusCode).json({
    status: false,
    statusCode:statusCode,
    message,
    errorSources,
     stack: "error stack"  
   
  });
};
