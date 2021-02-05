const DatabaseInterface = require('../../base/DatabaseInterface')

class Jobs extends DatabaseInterface{
  constructor(collection) {
    super();
    this.collection = collection
  }

  async findByName(name) {

  }

  async read(item) {

  }
}

module.exports = Jobs;
