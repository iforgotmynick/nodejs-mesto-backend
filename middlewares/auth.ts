import { NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import { SOME_SECRET_KEY } from '../const/some-secret-key';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });

      return;
  }

  const token = authorization!.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SOME_SECRET_KEY);
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });

      return;
  }

  req.user = payload;

  next();
};

export default auth;