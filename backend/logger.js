class Logger {
  constructor ({ config }) {
    this._config = config
  }

  log (...agrs) {
    console.log(...agrs)
  }
}

module.exports = Logger
