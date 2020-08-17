const development = require('./development')
const production = require('./production')

const environment = process.env.NODE_ENV

class ProductionStrategy {
  constructor () {
    this.environment = production
  }

  check (environment) {
    return environment === 'production'
  }
}

class DevelopmentStrategy {
  constructor () {
    this.environment = development
  }

  check () {
    return true
  }
}

const strategies = [
  new ProductionStrategy(),
  new DevelopmentStrategy()
]

module.exports = strategies.find(s => s.check(environment)).environment
