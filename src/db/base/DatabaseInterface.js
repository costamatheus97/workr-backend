class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}

class DatabaseInterface {
  create(item) {
    throw new NotImplementedException();
  }

  read(item) {
    throw new NotImplementedException();
  }

  update(id, item) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }

  isConnected() {
    throw new NotImplementedException();
  }
}

module.exports = DatabaseInterface
