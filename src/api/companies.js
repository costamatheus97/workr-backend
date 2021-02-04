const express = require('express');

const router = express.Router();

const CreateCompanyService = require('../services/CreateCompanyService')
const UpdateCompanyService = require('../services/UpdateCompanyService')
const ContextInterface = require('../db/base/ContextInterface')
const CompaniesRepository = require('../db/mongodb/repositories/CompaniesRepository')
const CompanySchema = require('../db/mongodb/schemas/CompanySchema')
const Base = require('../db/base/MongoBase')

const context = new ContextInterface(new CompaniesRepository(CompanySchema))

router.get('/', async (req, res, next) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection)
  const isConnected = await baseInterface.isConnected(connection)

  if(isConnected) {
    try {
      const companies = await context.read()
    
      res.json(companies);
    } catch (error) {
      next(error)
    }
  }
});

router.post('/', async (req, res, next) => {
  const createCompanyService = new CreateCompanyService()
  try {
    await createCompanyService.execute(req.body);

    res.json(req.body);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  const updateCompanyService = new UpdateCompanyService()
  try {
    const updatedCompany = await updateCompanyService.execute(req.body, req.params.id);

    res.json(updatedCompany).status(200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
