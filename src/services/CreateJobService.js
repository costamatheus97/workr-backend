const ContextInterface = require('../db/base/ContextInterface')
const Base = require('../db/base/MongoBase')

const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')

const CompaniesRepository = require('../db/mongodb/repositories/CompaniesRepository')
const CompanySchema = require('../db/mongodb/schemas/CompanySchema')

class CreateJobService {
  async execute(id, payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const jobsContext = new ContextInterface(new JobsRepository(JobSchema))
    const CompaniesContext = new ContextInterface(new CompaniesRepository(CompanySchema))

    const isConnected = baseInterface.isConnected();

    if(isConnected){
      const currentCompany = await CompaniesContext.findOne({ _id: id })

      if(!currentCompany) {
        throw new Error('Only registered companies are allowed to create jobs')
      }

      payload.company_id = id

      return jobsContext.create(payload)
    }
  }
}

module.exports = CreateJobService;
