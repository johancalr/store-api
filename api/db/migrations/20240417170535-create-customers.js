'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('../models/user.model');

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
