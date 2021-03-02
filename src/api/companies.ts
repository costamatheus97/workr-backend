import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const CreateCompanyService = require('../services/CreateCompanyService');
const UpdateCompanyService = require('../services/UpdateCompanyService');
const ContextInterface = require('../db/base/ContextInterface');
const CompaniesRepository = require('../db/mongodb/repositories/CompaniesRepository');
const CompanySchema = require('../db/mongodb/schemas/CompanySchema');
const Base = require('../db/base/MongoBase');

const router = Router();

const context = new ContextInterface(new CompaniesRepository(CompanySchema));

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

router.get('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection);
  const isConnected = await baseInterface.isConnected(connection);

  if (isConnected) {
    try {
      const companies = await context.read();

      res.json(companies);
    } catch (error) {
      next(error);
    }
  }
});

router.get('/:id', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection);
  const isConnected = await baseInterface.isConnected(connection);

  if (isConnected) {
    try {
      const { id } = req.params;
      const company = await context.findOne({ _id: id });

      res.json(company);
    } catch (error) {
      next(error);
    }
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const createCompanyService = new CreateCompanyService();
  try {
    await createCompanyService.execute(req.body);

    res.json(req.body);
  } catch (error) {
    next(error);
  }
});

router.put('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const updateCompanyService = new UpdateCompanyService();
  try {
    const updatedCompany = await updateCompanyService.execute(req.body, req.user.id);

    res.json(updatedCompany).status(200);
  } catch (error) {
    next(error);
  }
});

export default router;
