const express = require('express');
const { faker } = require('@faker-js/faker');

const usersRouter = express.Router();

// Users
usersRouter.get('/', (req, res) => {
  res.json([{
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    lastName: faker.person.lastName(),
  }])
});

module.exports = { usersRouter };
