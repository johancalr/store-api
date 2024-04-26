const boom = require('@hapi/boom');
const { models }= require('../libs/sequelize');

class ItemsService {

  constructor() {}

  async create(data) {
    const newItem = models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = { ItemsService };
