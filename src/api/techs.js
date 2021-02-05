const express = require('express');

const router = express.Router();

const CreateTechService = require('../services/CreateTechService')

const ContextInterface = require('../db/base/ContextInterface')
const TechsRepository = require('../db/mongodb/repositories/TechsRepository')
const TechSchema = require('../db/mongodb/schemas/TechSchema')
const Base = require('../db/base/MongoBase')

const context = new ContextInterface(new TechsRepository(TechSchema))

const ensureAuthenticated = require('../middlewares/EnsureAuthenticated')

router.use(ensureAuthenticated)

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  const techService = new CreateTechService()

  try {
    await techService.execute(req.body);

    res.json(req.body);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
