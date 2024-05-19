import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../expections/unauthorized";
import { ErrorCodes } from "../expections/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { prismaClient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
      );
    }
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    console.log("User :  ", user);

    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
      );
    }
    // @ts-ignore
    req.user = user;
    // @ts-ignore
    console.log("prinyted user : ", req.user);

    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
};

export default authMiddleware;
