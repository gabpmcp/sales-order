'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleOrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SaleOrderItem.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SaleOrderItem',
  });
  return SaleOrderItem;
};