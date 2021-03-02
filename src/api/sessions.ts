import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const router = Router();

const UserAuthenticationService = require('../services/UserAuthenticationService');
const CompanyAuthenticationService = require('../services/CompanyAuthenticationService');

router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const userAuthenticationService_ = new UserAuthenticationService();

  try {
    const { user, token } = await userAuthenticationService_.execute(req.body);
    const newUser = ({ ...user }._doc);

    delete newUser.hash;
    delete newUser.phone;

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post('/companies', async (req: Request, res: Response, next: NextFunction) => {
  const companyAuthenticationService_ = new CompanyAuthenticationService();

  try {
    const { user, token } = await companyAuthenticationService_.execute(req.body);
    const newCompany = ({ ...user }._doc);

    delete newCompany.hash;
    delete newCompany.phone;

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

export default router;
