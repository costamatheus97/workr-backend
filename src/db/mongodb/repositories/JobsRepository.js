const DatabaseInterface = require('../../base/DatabaseInterface')

class Jobs extends DatabaseInterface{
  constructor(collection) {
    super();
    this.collection = collection
  }

  async findByName(name) {
    const user = await this.collection.findOne({ name: name })

    return user;
  }

  async read(item) {
    const result = await this.collection.findOne({ item })
    
    return result
  }
}

module.exports = Jobs;
