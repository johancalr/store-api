const Joi = require('joi');

const { createUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().min(2);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  userId,
  user: createUserSchema.when('userId',{
    is: Joi.exist(),
    // then: Joi.forbidden(),
    then: () => {
      throw new Error('userId is not allowed when user object is present');
    },
  }),
  phone,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
