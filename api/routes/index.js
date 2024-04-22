const express = require('express');
const { productsRouter } = require('./products.router');
const { usersRouter } = require('./users.router');
const { CustomersRouter } = require('./customers.router');
const { categoriesRouter } = require('./categories.router');
const { ordersRouter } = require('./orders.router');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/customers', CustomersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
};

module.exports = { routerApi };
