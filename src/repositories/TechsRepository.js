const DatabaseInterface = require('../../base/DatabaseInterface')

class Techs extends DatabaseInterface{
  constructor(collection) {
    super();
    this.collection = collection
  }

  async read(item = {}, limit = 10, skip = 0) {
    const tech = await this.collection.find(item).limit(limit).skip(skip)

    return tech;
  }

  async create(item = {}) {
    return this.collection.create(item)
  }
}

module.exports = Techs;
