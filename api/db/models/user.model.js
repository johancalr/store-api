/**
 *  Create a set of rules for the management of data from public.users table
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW')
  }
}

class User extends Model {
  static associate(model){
    this.hasOne(model.Customer, {
      as: 'customer',
      foreignKey: 'userId',
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
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false, // Create default fields
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        afterCreate: async (user) => {
          delete user.dataValues.password;
        },
      },
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: { // use: models.User.scope("withPassword").findByPk(id)
        allProperties:{ attributes: {}, }
      },
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
}
