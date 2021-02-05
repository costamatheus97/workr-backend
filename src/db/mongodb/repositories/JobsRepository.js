const DatabaseInterface = require('../../base/DatabaseInterface')

class Jobs extends DatabaseInterface{
  constructor(collection) {
    super();
    this.collection = collection
  }

  async read(item = {}, limit = 10, skip = 0) {
    const result = await this.collection.find(item).limit(limit).skip(skip);
    
    return result
  }
  
  async create(item) {
    return this.collection.create(item)
  }

  async delete(item) {
    return this.collection.deleteOne(item)
  }
}

module.exports = Jobs;
