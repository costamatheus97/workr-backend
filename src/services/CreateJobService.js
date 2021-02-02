const ContextInterface = require('../db/base/ContextInterface')
const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')
const Base = require('../db/base/Base')

class CreateJobService {
  async execute() {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new JobsRepository(JobSchema))

    return await context.read()
  }
}

module.exports = CreateJobService;
