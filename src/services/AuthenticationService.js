const compare = require('bcryptjs');
const sign = require('jsonwebtoken');

const ContextInterface = require('../db/base/ContextInterface')
const UsersRepository = require('../db/mongodb/repositories/UsersRepository')
const UserSchema = require('../db/mongodb/schemas/UserSchema')
const Base = require('../db/base/MongoBase')
const authConfig = require('../config/auth')

const AppError = require('../error/AppError')

class AuthenticationService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection)
    const context = new ContextInterface(new UsersRepository(UserSchema))

    const { email, password } = payload

    const user = await context.read({ email: email })

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({},  secret, {
      subject: user.id,
      expiresIn
     })

    return {
      user,
      token
    }
  }
}

module.exports = AuthenticationService;
