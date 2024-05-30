require('dotenv').config();

const config = {
  env: process.env.NODE_ENV ?? 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT ?? 3000,
  dbEngine: process.env.DB_ENGINE,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
}

module.exports = {config};
