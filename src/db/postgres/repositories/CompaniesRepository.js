const DatabaseInterface = require('../../base/DatabaseInterface')

class Companies extends DatabaseInterface{
  constructor(collection) {
    this.collection = collection
  }

  async findByName(name) {

  }
}

module.exports = Companies;
