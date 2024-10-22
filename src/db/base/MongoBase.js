const Mongoose = require('mongoose');
require('dotenv').config();

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
};

class Base {
  constructor(connection) {
    this._connection = connection;
  }

  static connect() {
    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    }, (error) => {
      if (!error) return;
      console.log('Connection failure', error);
    });
    const { connection } = Mongoose;
    connection.once('open', () => console.log('Database running'));
    return connection;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];

    if (state === 'Connected') return state;

    if (state !== 'Connecting') return state;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return STATUS[this._connection.readyState];
  }
}

module.exports = Base;
