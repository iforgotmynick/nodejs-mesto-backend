import express, {Express,Response,NextFunction,} from 'express';
import mongoose from 'mongoose';
import usersRoutes from '../routes/users';
import cardsRoutes from '../routes/cards';
import {UserRequest} from '../interface/users';
import { CustomError } from '../interface/custom-error';
import { errors } from 'celebrate';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: UserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '67028460ca956bf465a17ebc'
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use(errors());

app.use((err: CustomError, req: UserRequest, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

app.listen(3000);

mongoose.connect('mongodb://localhost:27017/mestodb');
