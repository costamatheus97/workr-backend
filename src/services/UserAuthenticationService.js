const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const ContextInterface = require('../db/base/ContextInterface');
const UsersRepository = require('../db/mongodb/repositories/UsersRepository');
const UserSchema = require('../db/mongodb/schemas/UserSchema');
const Base = require('../db/base/MongoBase');
const authConfig = require('../config/auth');

class UserAuthenticationService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new UsersRepository(UserSchema));

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

module.exports = UserAuthenticationService;
