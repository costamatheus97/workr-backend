import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

import CreateCompanyService from '../services/CreateCompanyService'
import UpdateCompanyService from '../services/UpdateCompanyService'

import { getRepository } from 'typeorm'
import Company from '../models/Company'

const router = Router();

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

router.get('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {

    try {
      const companyRepository = getRepository(Company)
      const companies = await companyRepository.find();

      res.json(companies);
    } catch (error) {
      next(error);
    }

});

router.get('/:id', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const companyRepository = getRepository(Company)

      const company = await companyRepository.findOne({
        where: { id }
      })

      res.json(company);
    } catch (error) {
      next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCompanyService = new CreateCompanyService();
    await createCompanyService.execute(req.body);

    res.json(req.body);
  } catch (error) {
    next(error);
  }
});

router.put('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateCompanyService = new UpdateCompanyService();

    const payload = req.body;
    payload.id = req.user.id;

    const updatedCompany = await updateCompanyService.execute(payload);

    res.json(updatedCompany).status(200);
  } catch (error) {
    next(error);
  }
});

export default router;
