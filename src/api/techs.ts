import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const router = Router();

const CreateTechService = require('../services/CreateTechService')

const ContextInterface = require('../db/base/ContextInterface')
const TechsRepository = require('../repositories/TechsRepository')
const TechSchema = require('../db/mongodb/schemas/TechSchema')
const Base = require('../db/base/MongoBase')

const context = new ContextInterface(new TechsRepository(TechSchema))

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection)
  const isConnected = await baseInterface.isConnected(connection)

  if(isConnected) {
    try {
      const techs = await context.read()

      res.json(techs);
    } catch (error) {
      next(error)
    }
  }
});

router.post('/', ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  const techService = new CreateTechService()

  try {
    await techService.execute(req.body);

    res.json(req.body);
  } catch (error) {
    next(error)
  }
});

export default router;
