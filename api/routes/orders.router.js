const express = require('express');
const { OrdersService } = require('../services/order.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, updateOrderSchema } = require('../schemas/order.schema');

const ordersRouter = express.Router();
const ordersService = new OrdersService();

// Products
ordersRouter.get('/', async (req, res) => {
  const orders = await ordersService.find();
  res.json(orders);
});
ordersRouter.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await ordersService.findOne(id);
       res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);
ordersRouter.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newOrder = await ordersService.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error)
    }
  }
);
ordersRouter.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const order = await ordersService.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
ordersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await ordersService.delete(id);
  res.json(response);
});

module.exports = { ordersRouter };
