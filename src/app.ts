import express, {Express} from 'express';
import mongoose from 'mongoose';
import usersRoutes from '../routes/users';
import cardsRoutes from '../routes/cards';
import errorHandler from '../middlewares/error-handler';
import { errors } from 'celebrate';
import { createUser, login } from '../controllers/users';
import auth from '../middlewares/auth';
import cookieParser from 'cookie-parser';
import logger from '../middlewares/logger';
import errorLogger from '../middlewares/error-logger';
import expressWinston from 'express-winston';
import helmet  from 'helmet';
import { CustomError } from '../interface/custom-error';
import { NotFoundError } from '../errors/not-found-error';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: true,
  })
);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (res, req, next) => {
  next(new NotFoundError("Запрашиваемый ресурс не найден"))
});

app.use(
  expressWinston.logger({
    winstonInstance: errorLogger,
    meta: true,
    msg: "{{req.method}}  {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: true,
  })
);

app.use(errors());
app.use(errorHandler);

app.listen(3000);

mongoose.connect('mongodb://localhost:27017/mestodb');
