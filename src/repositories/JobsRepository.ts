import { EntityRepository, Repository } from 'typeorm'

import Jobs from '../models/Jobs'

@EntityRepository(Jobs)
class JobsRepository extends Repository<Jobs>{

  public async findById(id: string): Promise<Jobs | null> {
    const findJob = await this.findOne({
      where: { id }
    })

    return findJob || null
  }
}

export default JobsRepository;
