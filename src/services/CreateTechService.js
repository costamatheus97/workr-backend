const ContextInterface = require('../db/base/ContextInterface')
const TechsRepository = require('../db/mongodb/repositories/JobsRepository')
const TechSchema = require('../db/mongodb/schemas/TechSchema')
const Base = require('../db/base/MongoBase')

class CreateTechService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new TechsRepository(TechSchema))

    const isConnected = await baseInterface.isConnected(connection)

    if(isConnected) {
      const { tech_name: currentTech } = payload;

      const isTechInDatabase = await context.read({ tech_name: currentTech })

      if(isTechInDatabase.length) {
        throw new Error('Tech already in database')
      } else {
        try {
          return context.create(payload)
        } catch (error) {
          return error
        }
      }
    }
  }
}

module.exports = CreateTechService;
