import { CustomError, CustomErrorContent } from "../interface/custom-error";

export class DuplicateError extends CustomError {
  readonly statusCode: number = 409;
  readonly error: CustomErrorContent = {message: this.message};

  constructor(message: string) {
    super(message);
  }
}
