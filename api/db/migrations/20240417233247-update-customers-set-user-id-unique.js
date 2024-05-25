'use strict';

const { CUSTOMER_TABLE } = require('../models/customer.model');
const { config } = require('../../config/config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    if (config.dbEngine == 'postgres')
      await queryInterface.addConstraint(CUSTOMER_TABLE, {fields: ['user_id'], name: 'customers_user_id_ukey', type: 'UNIQUE'})
    else {
      await queryInterface.addIndex(CUSTOMER_TABLE, ['user_id'], {name: 'user_id_tmp', unique: true});
      await queryInterface.removeIndex(CUSTOMER_TABLE, 'user_id');
      await queryInterface.addIndex(CUSTOMER_TABLE, ['user_id'], {name: 'user_id', unique: true});
      await queryInterface.removeIndex(CUSTOMER_TABLE, 'user_id_tmp');
    }
  },

  async down (queryInterface) {
    if (config.dbEngine == 'postgres')
      await queryInterface.removeConstraint(CUSTOMER_TABLE, 'customers_user_id_ukey')
    else {
      await queryInterface.addIndex(CUSTOMER_TABLE, ['user_id'], {name: 'user_id_tmp', unique: false});
      await queryInterface.removeIndex(CUSTOMER_TABLE, 'user_id');
      await queryInterface.addIndex(CUSTOMER_TABLE, ['user_id'], {name: 'user_id', unique: false});
      await queryInterface.removeIndex(CUSTOMER_TABLE, 'user_id_tmp');
    }
  }
};
