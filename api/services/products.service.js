const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url({ width:250, height:250 }),
        category: faker.commerce.productAdjective(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = { ProductsService };
