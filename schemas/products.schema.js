const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const category = Joi.string().min(2);
const isBlocked = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  category: category.required(),
  isBlocked: isBlocked.required(),
});

const updateProductSchema = Joi.object({
  id: id.required(),
  price,
  image,
  category,
  isBlocked,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
}
