/**
 *  Create a set of rules for the management of data from public.customers table
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');
const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    unique: true,
    field: 'user_id',
    type: DataTypes.INTEGER,
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
}

class Customer extends Model {
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    })
  }
  /**
   *
   * @param {Object} sequelize conection to db
   * @returns config object
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false // Create default fields
    }
  }
}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer,
}
