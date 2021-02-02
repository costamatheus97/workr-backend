const DatabaseInterface = require('../../base/DatabaseInterface')

class Techs extends DatabaseInterface{
  constructor(collection) {
    this.collection = collection
  }

  async findByName(name) {
    const user = await this.collection.findOne({ name: name })

    return user;
  }
}

module.exports = Techs;
