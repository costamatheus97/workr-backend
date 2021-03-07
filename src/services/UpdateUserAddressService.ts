import { getRepository } from 'typeorm'

import AppError from '../error/AppError'
import User from '../models/User'

interface RequestDTO {
  id: string,
  city: string,
  state: string,
  country: string,
  cep: string,
}

class UpdateUserProfileService {
  async execute({ city, state, country, cep, id }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: { id }
    })

    if (!user) {
      throw new AppError('User not found in database');
    }

    user.city = city
    user.state = state
    user.country = country
    user.cep = cep

    await usersRepository.save(user)

    return user;
  }
}

export default UpdateUserProfileService;
