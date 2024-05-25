const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomersService {
  constructor() {
  }

  async create (data) {
    const options = {};
    if (data.user)
      options.include = ['user'];
    const newCustomer =  await models.Customer.create(data, options);
    return newCustomer;
  }

  async find () {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { rta: true, id };
  }
}

module.exports = { CustomersService };
