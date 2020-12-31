'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lottery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lottery.init({
    prize: DataTypes.STRING,
    prize_name: DataTypes.STRING,
    prize_img: DataTypes.STRING,
    prize_weights: DataTypes.NUMBER,
    is_deleted: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Lottery',
  });
  return Lottery;
};