import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const router = Router();

import UserAuthenticationService from '../services/UserAuthenticationService'
import CompanyAuthenticationService from '../services/CompanyAuthenticationService'

router.post('/users', async (req, response) => {

    const { email, hash } = req.body;

    const authenticateUser = new UserAuthenticationService();

    const { user, token } = await authenticateUser.execute({ email, hash });

    delete user.hash;

    return response.json({ user, token })
});

router.post('/companies', async (req, response) => {

  const { email, hash } = req.body;

  const authenticateCompany = new CompanyAuthenticationService();

  const { user, token } = await authenticateCompany.execute({ email, hash });

  delete user.hash;

  return response.json({ user, token })
});

export default router;
