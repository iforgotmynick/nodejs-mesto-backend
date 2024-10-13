import Card from "../models/card";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import {WrongOwnershipError} from '../errors/wrong-ownership-error';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Нет карты с таким id");
      }

      if (card.owner !== req.user) {
        throw new WrongOwnershipError("Нельзя удалить чужую карту");
      }
    })
    .then(() => Card.findByIdAndDelete(req.params.cardId))
    .catch(next);
};

export const addLike = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user } },
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

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user } },
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
