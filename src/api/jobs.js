const express = require('express');

const router = express.Router();

const CreateJobService = require('../services/CreateJobService')
const ContextInterface = require('../db/base/ContextInterface')
const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')
const Base = require('../db/base/MongoBase')

const context = new ContextInterface(new JobsRepository(JobSchema))

router.get('/', async (req, res, next) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection)
  const isConnected = await baseInterface.isConnected(connection)

  if(isConnected) {
    try {
      const jobs = await context.read()
    
      res.json(jobs);
    } catch (error) {
      next(error)
    }
  }
});

router.post('/', async (req, res, next) => {
  const jobService = new CreateJobService()
  try {
    await jobService.execute(req.body);

    res.json(req.body);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection)
  const isConnected = await baseInterface.isConnected(connection)

  const { id } = req.params

  if(isConnected) {
    try {
      await context.delete( {_id: id} )
    
      res.status(200).send()
    } catch (error) {
      next(error)
    }
  }
});

module.exports = router;