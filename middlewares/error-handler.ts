import { NextFunction, Response, Request} from 'express';
import { CustomError } from '../interface/custom-error';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
};

export default errorHandler;