const express = require('express');
const { UsersService } = require('../services/users.service');

const usersRouter = express.Router();
const usersService = new UsersService();

// Users
usersRouter.get('/', async (req, res) => {
  const users = await usersService.find();
  res.json(users);
});

module.exports = { usersRouter };
