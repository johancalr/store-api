const boom = require('@hapi/boom');
const { models }= require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find({limit, offset, price, price_min, price_max}) {
    const options = {
      include: ['category'],
      where: {},
    }
    // Pagination
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }
    // Filters
    if (price) {
      options.where.price = parseInt(price);
    } else if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [parseInt(price_min), parseInt(price_max)]
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { rta: true, id };
  }
}

module.exports = { ProductsService };
