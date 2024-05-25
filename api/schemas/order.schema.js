const Joi = require('joi');

const id = Joi.number().integer();
const status = Joi.number().integer().min(1).max(3);
const customerId = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  status,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
}
