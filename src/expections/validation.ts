import { ErrorCodes, HttpException } from "./root";

export class UnProcessableEntity extends HttpException {
  constructor(message: string, errorCode: ErrorCodes, error: any) {
    super(message, errorCode, 422, error);
  }
}
