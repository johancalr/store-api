const { config } = require('../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: config.dbEngine,
  },
  production: {
    url: config.dbUrl,
    dialect: config.dbEngine,
    // ssl: { rejectUnauthorized: false},
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // very important
      }
    }
  }
}
