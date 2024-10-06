import { NotFoundError } from "../errors/not-found-error";
import { UserRequest } from "../interface/users";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  return User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.send(user))
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

export const updateUser = (req: UserRequest, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(req.user!._id, req.body,  { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

export const updateUserAvatar = (req: UserRequest, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(req.user!._id, { avatar: req.body.avatar })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(card);
    })
    .catch(next);
};
