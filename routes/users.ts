import { Router, Request, Response, NextFunction } from 'express';
import { createUser, getUser, getUsers, updateUser, updateUserAvatar } from '../controllers/users';
import { celebrate, Joi } from 'celebrate';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) =>  {
  getUsers(req, res, next)
});

router.get('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24)
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  getUser(req, res, next)
});

router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
      avatar: Joi.string().required(),
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  createUser(req, res, next)
});

router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
      avatar: Joi.string().required()
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  updateUser(req, res, next)
});

router.patch('/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required()
    }),
  }),(req: Request, res: Response, next: NextFunction) =>  {
  updateUserAvatar(req, res, next)
});

export default router;