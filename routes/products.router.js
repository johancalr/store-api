const express = require('express');
const { faker } = require('@faker-js/faker');

const productsRouter = express.Router();

// Products
productsRouter.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size ?? 10;
  const products = [];
  for (let index = 0; index < limit; index++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url({ width:250, height:250 }),
      category: faker.commerce.productAdjective(),
    });
  }
  res.json(products);
});
productsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url({ width:250, height:250 }),
    category: faker.commerce.productAdjective(),
  });
});

module.exports = { productsRouter };
