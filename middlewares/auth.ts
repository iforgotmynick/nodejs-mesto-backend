import { NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import { SOME_SECRET_KEY } from '../const/some-secret-key';
import {AuthError} from '../errors/auth-error';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация')
  }

  const token = authorization!.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SOME_SECRET_KEY);
  } catch (err) {
    throw new AuthError('Необходима авторизация')
  }

  req.user = payload;

  next();
};

export default auth;