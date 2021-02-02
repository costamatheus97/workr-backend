const DatabaseInterface = require('../../base/DatabaseInterface')

class Companies extends DatabaseInterface{
  constructor(collection) {
    this.collection = collection
  }

  async findByName(name) {
    const user = await this.collection.findOne({ name: name })

    return user;
  }
}

module.exports = Companies;
