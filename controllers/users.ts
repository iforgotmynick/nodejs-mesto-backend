import { NotFoundError } from "../errors/not-found-error";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {SOME_SECRET_KEY} from '../const/some-secret-key';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user as string | JwtPayload;

  return User.findById(userId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет пользователя с таким id");
      }

      res.send(card);
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user as string | JwtPayload;

  User.findByIdAndUpdate(userId, req.body,  { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user as string | JwtPayload;

  User.findByIdAndUpdate(userId, { avatar: req.body.avatar })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SOME_SECRET_KEY, { expiresIn: '7d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      res.status(201).send({ token });
    })
    .catch(next);
};