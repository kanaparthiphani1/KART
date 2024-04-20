import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../expections/unauthorized";
import { ErrorCodes } from "../expections/root";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = req.user;
  if (user.role == "ADMIN") {
    return next();
  } else {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
    );
  }
};

export default adminMiddleware;
