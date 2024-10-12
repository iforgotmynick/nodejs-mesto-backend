import { Router, Request, Response, NextFunction } from 'express';
import { getMe, getUser, getUsers, updateUser, updateUserAvatar } from '../controllers/users';
import { celebrate, Joi } from 'celebrate';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) =>  {
  getUsers(req, res, next)
});

router.get('/me',
  (req: Request, res: Response, next: NextFunction) =>  {
  getMe(req, res, next)
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

router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().uri({ scheme: ['http', 'https'] }).required()
    }),
  }),
  (req: Request, res: Response, next: NextFunction) =>  {
  updateUser(req, res, next)
});

router.patch('/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri({ scheme: ['http', 'https'] }).required()
    }),
  }),(req: Request, res: Response, next: NextFunction) =>  {
  updateUserAvatar(req, res, next)
});

export default router;