const ContextInterface = require('../db/base/ContextInterface')
const TechsRepository = require('../db/postgres/repositories/TechsRepository')
const TechSchema = require('../db/postgres/schemas/TechSchema')
const Base = require('../db/base/PostgresBase')

class CreateJobService {
  async execute() {
    const connection = await Base.connect();
    const techModel = Base.defineModel(connection, TechSchema)
    const baseInterface = new Base(connection, techModel)

    const context = new ContextInterface(new TechsRepository(TechSchema))

    return await context.read()
  }
}

module.exports = CreateJobService;
