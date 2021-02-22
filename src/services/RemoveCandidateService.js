const ContextInterface = require('../db/base/ContextInterface');
const Base = require('../db/base/MongoBase');

const JobsRepository = require('../db/mongodb/repositories/JobsRepository');
const JobSchema = require('../db/mongodb/schemas/JobSchema');

class RemoveCandidateService {
  async execute(jobId, companyId, payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new JobsRepository(JobSchema));

    const isConnected = baseInterface.isConnected();

    if (isConnected) {
      const currentJob = await context.findOne({ _id: jobId });

      if (!currentJob) {
        throw new Error('Job not found in database');
      }

      if (currentJob.company_id !== companyId) {
        throw new Error('You have no permission to edit this job');
      }

      console.log(payload);

      return context.update({ _id: jobId }, {
        $set: payload
      });
    }
  }
}

module.exports = RemoveCandidateService;
