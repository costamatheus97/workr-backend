const ContextInterface = require('../db/base/ContextInterface')
const Base = require('../db/base/MongoBase')

const JobsRepository = require('../db/mongodb/repositories/JobsRepository')
const JobSchema = require('../db/mongodb/schemas/JobSchema')

class CreateJobService {
  async execute(jobId, userId) {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new JobsRepository(JobSchema))

    const isConnected = baseInterface.isConnected();

    if(isConnected){
      let currentJob
      
      try {
        currentJob = await context.findOne({ _id: jobId })
      } catch (error) {
        throw new Error('Job not found in database')
      }

      const candidates = currentJob.candidates
      const isCandidated = candidates.filter(candidate => candidate === userId)

      if(isCandidated.length > 0) {
        throw new Error('You already candidated for this job')  
      }

      const updatedCandidates = [...candidates, userId]

      return context.update({ _id: jobId }, {
        $set: {
          candidates: updatedCandidates
        }
      })
    }
  }
}

module.exports = CreateJobService;
