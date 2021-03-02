import { EntityRepository, Repository } from 'typeorm'

import Company from '../models/Company'

@EntityRepository(Company)
class CompanyRepository extends Repository<Company>{

  public async findById(id: string): Promise<Company | null> {
    const findCompany = await this.findOne({
      where: { id }
    })

    return findCompany || null
  }
}

export default CompanyRepository;
