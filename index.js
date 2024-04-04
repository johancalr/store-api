const express = require('express');
const { faker } = require('@faker-js/faker');

// Server initialization
const app = express();
const port = 3000;

// Data
const originalProducts = [
  {
    id: 1,
    name: 'Soffa',
    price: 299.99,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Tv Sony',
    price: 849.99,
    categoryId: 2,
  },
  {
    id: 3,
    name: 'Tv LG',
    price: 899.99,
    categoryId: 2,
  },
  {
    id: 4,
    name: 'Tv Samsung',
    price: 899.99,
    categoryId: 2,
  },
  {
    id: 5,
    name: 'Tv Xiaomi',
    price: 899.99,
    categoryId: 2,
  },
];
const categories = [
  {
    id: 1,
    name: 'furniture',
  },
  {
    id: 2,
    name: 'home appliances',
  },
]

// Routes creation
app.get('/', (req, res) => {
  res.send('Hello Word with Express')
});
// Products
app.get('/products', (req, res) => {
  const { size } = req.query;
  const limit = size ?? 10;
  const products = [];
  for (let index = 0; index < limit; index++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url({ width:250, height:250 }),
      categoryId: faker.commerce.productAdjective(),
    });
  }
  res.json(products);
});
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const foundProduct = originalProducts.find(product => product.id === parseInt(id));
  res.json(foundProduct??{});
});
// Categories
app.get('/categories', (req, res) => {
  res.json(categories);
});
app.get('/categories/:categoryId', (req, res) => {
  const { categoryId: id } = req.params;
  const filteredCategory = categories.find(category => category.id === parseInt(id));
  res.json(filteredCategory??{});
});
app.get('/categories/:categoryId/products', (req, res) => {
  const { categoryId } = req.params;
  const { limit, offset } = req.query;
  let filteredProducts = originalProducts.filter(product => product.categoryId === parseInt(categoryId));
  const start = offset > 0 ? parseInt(offset) : 0;
  const end   = limit  > 0 ? (parseInt(limit) + start) : filteredProducts.length;
  filteredProducts = filteredProducts.slice(start, end);
  res.json(filteredProducts??[]);
});
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  const filteredProducts = originalProducts.filter(product => product.categoryId === parseInt(categoryId));
  const foundProduct = filteredProducts.find(product => product.id === parseInt(productId));
  res.json(foundProduct??{});
});
// Users
app.get('/users', (req, res) => {
  res.json([{
    name: 'Johan Camilo',
    lastName: 'Lozano Ramírez',
  }])
});


// Lauch server
app.listen(port, () => {
  console.log(`Running on port: ${port} successfully`);
});
