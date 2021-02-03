const ContextInterface = require('../db/base/ContextInterface')
const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')
const Base = require('../db/base/MongoBase')

class CreateJobService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new JobsRepository(JobSchema))

    return context.create(payload)
  }
}

module.exports = CreateJobService;
