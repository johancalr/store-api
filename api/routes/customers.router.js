const express = require('express');
const { CustomersService } = require('../services/customer.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { updateCustomerSchema, createCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');

const CustomersRouter = express.Router();
const customersService = new CustomersService();

// Users
CustomersRouter.get('/', async (req, res, next) => {
  try {
    const users = await customersService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

CustomersRouter.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customersService.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

CustomersRouter.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await customersService.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

CustomersRouter.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await customersService.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

CustomersRouter.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await customersService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { CustomersRouter };
