const express = require('express');
const { validatorHandler } = require('../middlewares/validator.handler');
const { ItemsService } = require('../services/item.service');
const { createItemSchema, getItemSchema } = require('../schemas/item.schema');

const itemsRouter = express.Router();
const itemsService = new ItemsService();

itemsRouter.post('/',
validatorHandler(createItemSchema, 'body'),
async (req, res, next) => {
  try {
    const { body } = req;
    const newItem = await itemsService.create(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error)
  }
}
);

module.exports = { itemsRouter };
