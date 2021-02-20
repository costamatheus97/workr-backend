const ContextInterface = require('../db/base/ContextInterface');
const UsersRepository = require('../db/mongodb/repositories/UsersRepository');
const UserSchema = require('../db/mongodb/schemas/UserSchema');
const Base = require('../db/base/MongoBase');

class CreateUserService {
  async execute(payload, id) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new UsersRepository(UserSchema));

    const isConnected = await baseInterface.isConnected();

    if (isConnected) {
      const user = await context.read({ _id: id });

      if (user.length === 0) {
        throw new Error('User not found in database');
      }

      return context.update({ _id: id }, {
        $set: { first_name: 'teste' }
      });
    }
  }
}

module.exports = CreateUserService;
