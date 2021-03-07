import { getRepository } from 'typeorm'

import AppError from '../error/AppError'
import Company from '../models/Company'
import Job from '../models/Jobs'

interface RequestDTO {
  id: string,
  payload: Job
}

class CreateJobService {
  async execute({ id, payload }: RequestDTO): Promise<Job> {
    const companyRepository = getRepository(Company)
    const jobsRepository = getRepository(Job)

      const currentCompany = await companyRepository.findOne({ id })

      if(!currentCompany) {
        throw new AppError('Only registered companies are allowed to create jobs')
      }

      payload.company_id = id

      const job = await jobsRepository.create(payload)

      await jobsRepository.save(job)

      return job;
  }
}

export default CreateJobService
