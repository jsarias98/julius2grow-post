const mongoose = require('mongoose')

class Database {
  constructor ({ config, logger }) {
    this._connection = null
    this._config = config
    this._logger = logger
  }

  async getConnection () {
    if (!this._connection) {
      await this.connect()
    }
    return this._connection
  }

  async connect () {
    await mongoose.connect(this._config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    this._connection = true
  }
}

module.exports = Database
