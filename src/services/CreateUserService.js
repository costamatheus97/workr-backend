const { hash } = require('bcryptjs');

const ContextInterface = require('../db/base/ContextInterface');
const UsersRepository = require('../db/mongodb/repositories/UsersRepository');
const UserSchema = require('../db/mongodb/schemas/UserSchema');
const Base = require('../db/base/MongoBase');

class CreateUserService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new UsersRepository(UserSchema));

    const isConnected = await baseInterface.isConnected();

    if (isConnected) {
      const { email } = payload;
      const userInDatabase = await context.read({ email });

      if (userInDatabase.length) {
        throw new Error('User already exists in database');
      }

      const hashedPassword = await hash(payload.hash, 8);

      const user = {
        email,
        hash: hashedPassword,
        phone: payload.phone,
        full_name: payload.full_name,
        is_company: false,
        is_premium: false,
        is_verified: false,
        created_at: Date.now(),
        updated_at: Date.now()
      };

      return await context.create(user);
    }
  }
}

module.exports = CreateUserService;
