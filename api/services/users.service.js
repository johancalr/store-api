const boom = require('@hapi/boom');
const { pool } = require('../libs/postgres.pool');

class UsersService {
  constructor() {
    this.users = [];
    this.pool = pool;
    this.pool.on('error', (err) => {throw boom.internal(err.message);})
  }

  async getUsers () {
    const query = 'SELECT * FROM tasks';
    const rta    = await this.pool.query(query);
    this.users = rta.rows;
  }

  async find () {
    try {
      await this.getUsers();
      return this.users;
    } catch (error) {
      // console.log('================','Error en la consulta', error);
      // throw boom.internal(error.message);
    }
  }
}

module.exports = { UsersService };
