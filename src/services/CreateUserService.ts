const { hash } = require('bcryptjs');

import { getRepository } from 'typeorm'

import AppError from '../error/AppError'
import User from '../models/User'

interface RequestDTO {
  email: string,
  hash: string,
  phone: string,
  full_name: string
}

class CreateUserService {
  async execute({ email, hash, phone, full_name }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUserExists = await usersRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new AppError('User already exists in database');
    }

    const hashedPassword = await hash(hash, 8);

    const user =  await usersRepository.create({
      email,
      hash: hashedPassword,
      phone: phone,
      full_name: full_name,
      is_company: false,
      is_premium: false,
      is_verified: false
    });

    await usersRepository.save(user)

    return user;
  }
}

export default CreateUserService
