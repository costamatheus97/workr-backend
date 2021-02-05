const express = require('express');

const router = express.Router();  

const CreateJobService = require('../services/CreateJobService')
const ContextInterface = require('../db/base/ContextInterface')
const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')
const Base = require('../db/base/MongoBase')

const context = new ContextInterface(new JobsRepository(JobSchema))

const ensureAuthenticated = require('../middlewares/EnsureAuthenticated')

router.use(ensureAuthenticated)

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
  const { id } = req.user;

  const jobService = new CreateJobService();
  try {
    await jobService.execute(id, req.body);

    res.json(req.body);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection)
  const isConnected = await baseInterface.isConnected(connection)

  const companyId = req.params.id
  const currentCompanyId = req.user.id

  if(isConnected) {
    try {
      if(companyId !== currentCompanyId) {
        throw new Error('Only the company that created the job can delete it!')
      }
      
      await context.delete( {_id: id} )
    
      res.status(200).send()
    } catch (error) {
      next(error)
    }
  }
});

module.exports = router;