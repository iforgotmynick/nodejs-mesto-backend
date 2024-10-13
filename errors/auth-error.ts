import { CustomError, CustomErrorContent } from "../interface/custom-error";

export class AuthError extends CustomError {
  readonly statusCode: number = 401;
  readonly error: CustomErrorContent = {message: this.message};

  constructor(message: string) {
    super(message);
  }
}
