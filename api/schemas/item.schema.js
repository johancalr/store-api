const Joi = require('joi');

const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const getItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
});

module.exports = { createItemSchema, getItemSchema };
