import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const router = Router();

import { getRepository } from 'typeorm'
import User from '../models/User'

import CreateUserService from '../services/CreateUserService'
import UpdateUserProfileService from '../services/UpdateUserProfileService'
import UpdateUserAddressService from '../services/UpdateUserAddressService'

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

router.get('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersRepository = getRepository(User)
      const users = await usersRepository.find()

      res.json(users);
    } catch (error) {
      next(error);
    }

});

router.get('/:id', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersRepository = getRepository(User)

      const { id } = req.params;
      const users = await usersRepository.findOne({
        where: { id }
      })

      res.json(users);
    } catch (error) {
      next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const createUserService = new CreateUserService();
  try {
    const newUser = await createUserService.execute(req.body);

    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put('/profile', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const updateUserProfileService = new UpdateUserProfileService();
  try {
    const payload = req.body;
    payload.id = req.user.id;

    const updatedUser = await updateUserProfileService.execute(payload);

    res.json(updatedUser).status(200);
  } catch (error) {
    next(error);
  }
});

router.put('/address', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const updateUserAddressService = new UpdateUserAddressService();
  try {
    const payload = req.body;
    payload.id = req.user.id;

    const updatedUser = await updateUserAddressService.execute(payload);

    res.json(updatedUser).status(200);
  } catch (error) {
    next(error);
  }
});

router.put('/resume', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  // const updateUserResumeService = new UpdateUserResumeService();
  // try {
  //   const payload = req.body;
  //   payload.id = req.user.id;

  //   const updatedUser = await updateUserResumeService.execute(payload);

  //   res.json(updatedUser).status(200);
  // } catch (error) {
  //   next(error);
  // }
});

export default router;
