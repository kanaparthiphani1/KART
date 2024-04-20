import { NextFunction, Request, Response } from "express";
import { HttpException } from "../expections/root";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Mesage  in middleware: ", error.message);

  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
