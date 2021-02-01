const DatabaseInterface = require('../../base/DatabaseInterface')

class Jobs extends DatabaseInterface{
  constructor(collection) {
    this.collection = collection
  }

  async findByName(name) {
    const user = await this.collection.findOne({ name: name })

    return user;
  }
}

module.exports = Jobs;
