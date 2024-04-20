import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpException } from "./expections/root";
import { ZodError } from "zod";
import { BadRequestException } from "./expections/bad-request";
import { InternalException } from "./expections/internal-exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestException(
            "Unprocessable entity.",
            ErrorCodes.UNPROCESSABLE_ENTITY,
            error
          );
        } else {
          exception = new InternalException(
            "Something went wrong!",
            error,
            ErrorCodes.INTERNAL_EXCEPTION
          );
        }
      }
      return next(exception);
    }
  };
};
