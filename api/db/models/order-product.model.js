/**
 *  Create a set of rules for the management of data from public.users table
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model')

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class OrderProduct extends Model {
  static associate(/* model */){
    /* this.hasOne(model.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    }) */
  }
  /**
   *
   * @param {Object} sequelize conection to db
   * @returns config object
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false // Create default fields
    }
  }
}

module.exports = {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
  OrderProduct,
}
