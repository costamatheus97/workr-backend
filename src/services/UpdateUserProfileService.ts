import { getRepository } from 'typeorm'

import AppError from '../error/AppError'
import User from '../models/User'

interface RequestDTO {
  id: string,
  full_name: string,
  birthdate: string,
  description: string,
  phone: string,
  interest_location: [string],
  skills: [string],
}

class UpdateUserProfileService {
  async execute({ full_name, birthdate, description, phone, interest_location, skills, id }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: { id }
    })

    if (!user) {
      throw new AppError('User not found in database');
    }

    user.full_name = full_name
    user.birthdate = birthdate
    user.description = description
    user.phone = phone
    user.interest_location = interest_location
    user.skills = skills

    await usersRepository.save(user)

    return user;
  }
}

export default UpdateUserProfileService;
