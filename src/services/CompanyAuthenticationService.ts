const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

import User from '../models/User'

const CompaniesRepository = require('../db/mongodb/repositories/CompaniesRepository');
const CompanySchema = require('../db/mongodb/schemas/CompanySchema');
const Base = require('../db/base/MongoBase');
import authConfig from '../config/auth'
import ContextInterface from '../db/base/ContextInterface'


interface RequestDTO {
  email: string;
  hash: string;
}

interface Auth {
  user: User,
  token: string
}

class CompanyAuthenticationService {
  public async execute({ email, hash }: RequestDTO): Promise<Auth> {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new CompaniesRepository(CompanySchema));

    const user = await context.findOne({ email });

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
