const DatabaseInterface = require('../../base/DatabaseInterface');

class Companies extends DatabaseInterface {
  constructor(collection) {
    super();
    this.collection = collection;
  }

  async read(item = {}, limit = 10, skip = 0) {
    const result = await this.collection.find(item).limit(limit).skip(skip).select('-hash');

    return result;
  }

  async findOne(item = {}) {
    const result = await this.collection.findOne(item);

    return result;
  }

  async create(item) {
    return this.collection.create(item);
  }

  async update(id, item) {
    return this.collection.update(id, item);
  }
}

module.exports = Companies;
