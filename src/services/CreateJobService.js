const ContextInterface = require('../db/base/ContextInterface')
const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')
const Base = require('../db/base/MongoBase')

class CreateJobService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new JobsRepository(JobSchema))

    try {
      return context.create(payload)
    } catch (error) {
      return error
    }
  }
}

module.exports = CreateJobService;
