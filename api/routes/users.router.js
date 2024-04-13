const express = require('express');
const { UsersService } = require('../services/users.service');
const { validatorHandler } = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/users.schema');

const usersRouter = express.Router();
const usersService = new UsersService();

// Users
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await usersService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await usersService.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await usersService.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await usersService.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await usersService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);



module.exports = { usersRouter };
