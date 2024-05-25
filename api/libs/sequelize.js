const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const { setupModels } = require('../db/models');

const options = {
  dialect: config.dbEngine,
  logging: config.isProd? false : console.log,
};
if (config.isProd){
  options.ssl = {
    rejectUnauthorized: false,
  };
  options.dialectModule = require('pg');
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// sequelize.sync(); No es necesario sincronizar s

module.exports = sequelize;
