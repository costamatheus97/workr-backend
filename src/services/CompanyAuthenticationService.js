const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const ContextInterface = require('../db/base/ContextInterface');
const CompaniesRepository = require('../db/mongodb/repositories/CompaniesRepository');
const CompanySchema = require('../db/mongodb/schemas/CompanySchema');
const Base = require('../db/base/MongoBase');
const authConfig = require('../config/auth');

class CompanyAuthenticationService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new CompaniesRepository(CompanySchema));

    const { email, hash } = payload;

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

module.exports = CompanyAuthenticationService;
