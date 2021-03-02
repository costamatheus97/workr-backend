import DatabaseInterface from './DatabaseInterface'

class ContextInterface extends DatabaseInterface {
  constructor(database: Object) {
    super();
    this._database = database;
  }

  isConnected() {
    return this._database.isConnected();
  }

  connect() {
    return this._database.connect();
  }

  create(item) {
    return this._database.create(item);
  }

  read(item) {
    return this._database.read(item);
  }

  findOne(item) {
    return this._database.findOne(item);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

export default ContextInterface;
