const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer();
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const isBlocked = Joi.boolean();

// Query params
const limit  = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
  isBlocked,
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
  isBlocked,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.exist(),
    then: Joi.number().integer().greater(Joi.ref('price_min')).required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
}
