const express = require('express');
const { faker } = require('@faker-js/faker');

const categoriesRouter = express.Router();

const categories = [
  {
    id: 1,
    name: 'furniture',
  },
  {
    id: 2,
    name: 'home appliances',
  },
];

// Categories
categoriesRouter.get('/', (req, res) => {
  res.json(categories);
});
categoriesRouter.get('/:categoryId', (req, res) => {
  const { categoryId: id } = req.params;
  const filteredCategory = categories.find(category => category.id === parseInt(id));
  res.json(filteredCategory??{});
});

module.exports = { categoriesRouter };
