const boom = require('@hapi/boom');
const { models }= require('../libs/sequelize');

class ProductsService {

  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find({limit, offset}) {
    const options = {
      include: ['category'],
    }
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
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
