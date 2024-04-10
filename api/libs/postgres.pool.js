const { Pool } = require('pg');
const { config } = require('../config/config');

// Las variables de entorno se codifican para agregar una capa extra de seguridad
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool ({ connectionString: URI });

module.exports = {pool};
