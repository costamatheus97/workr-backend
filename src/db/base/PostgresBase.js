const Sequelize = require('sequelize');
require('dotenv').config();

class Base {
  constructor(connection) {
    this._connection = connection
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options,
    );
    await model.sync()
    return model
  }

  static async connect() {
    const sequelize  = new Sequelize(
      process.env.POSTGRES_DB, //database
      process.env.POSTGRES_USERNAME, // user
      process.env.POSTGRES_PASSWORD, //senha
      {
        host: 'localhost',
        dialect: 'postgres',
        // case sensitive
        quoteIdentifiers: false,
        // deprecation warning
        operatorsAliases: false,
        //disable logging
        logging: false
        // dialectOptions: {
        //   ssl: true,
      },
    );
    return sequelize
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error('Connection failed', error);
      return false;
    }
  }
}

module.exports = Base