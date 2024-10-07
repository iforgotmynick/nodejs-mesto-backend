import { Router, Request, Response, NextFunction } from 'express';
import { getCards, createCard, deleteCard, addLike, removeLike } from '../controllers/cards';
import { celebrate, Joi } from 'celebrate';

const router = Router();

router.get('/',
  (req: Request, res: Response, next: NextFunction) =>  {
  getCards(req, res, next)
});

router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.link().required(),
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  createCard(req, res, next)
});

router.delete('/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24)
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  deleteCard(req, res, next)
});

router.put('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24)
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  addLike(req, res, next)
});

router.delete('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24)
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  removeLike(req, res, next)
});


export default router;