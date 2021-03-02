import { EntityRepository, Repository } from 'typeorm'

import User from '../models/User'

@EntityRepository(User)
class UsersRepository extends Repository<User>{

  public async findById(id: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { id }
    })

    return findUser || null
  }
}

export default UsersRepository;
