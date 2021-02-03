const ContextInterface = require('../db/base/ContextInterface')
const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const UserSchema = require('../db/mongodb/schemas/UserSchema')
const Base = require('../db/base/MongoBase')

class CreateUserService {
  async execute() {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new JobsRepository(JobSchema))

    return await context.read()
  }
}

module.exports = CreateUserService;
