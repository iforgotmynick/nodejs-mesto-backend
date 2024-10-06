import { UserRequest } from "../interface/users";
import Card from "../models/card";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";

export const createCard = (req: UserRequest, res: Response, next: NextFunction) => {
  return Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user!._id,
  })
    .then((card) => res.send(card))
    .catch(next);
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карты с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

export const addLike = (req: UserRequest, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user!._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карты с таким id");
      }
      res.send(card);
    })
    .catch(next);
};

export const removeLike = (req: UserRequest, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user!._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карты с таким id");
      }
      res.send(card);
    })
    .catch(next);
};
