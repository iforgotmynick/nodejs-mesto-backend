import { CustomError, CustomErrorContent } from "../interface/custom-error";

export class WrongOwnershipError extends CustomError {
  readonly statusCode: number = 403;
  readonly error: CustomErrorContent = {message: this.message};

  constructor(message: string) {
    super(message);
  }
}
