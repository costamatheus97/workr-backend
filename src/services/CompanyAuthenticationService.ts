const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

import { getRepository } from 'typeorm'

import Company from '../models/Company'

import authConfig from '../config/auth'

interface RequestDTO {
  email: string;
  hash: string;
}

interface Auth {
  user: Company,
  token: string
}

class CompanyAuthenticationService {
  public async execute({ email, hash }: RequestDTO): Promise<Auth> {
    const companyRepository = getRepository(Company)

    const user = await companyRepository.findOne({ email });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(hash, user.hash);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default CompanyAuthenticationService;
