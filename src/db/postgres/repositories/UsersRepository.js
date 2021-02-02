const DatabaseInterface = require('../../base/DatabaseInterface')

class Users extends DatabaseInterface{
  constructor(collection) {
    this.collection = collection
  }

  async findByName(name) {

  }
}

module.exports = Users;
