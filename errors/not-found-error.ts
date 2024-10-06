import { CustomError, CustomErrorContent } from "../interface/custom-error";

export class NotFoundError extends CustomError {
  readonly statusCode: number = 404;
  readonly error: CustomErrorContent = {message: this.message};

  constructor(message: string) {
    super(message);
  }
}
