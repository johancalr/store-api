const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const description = Joi.string().min(10).max(300);

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  name,
  image,
  description,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
