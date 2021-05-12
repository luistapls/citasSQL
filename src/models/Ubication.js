'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ubication.hasMany(models);
    }
  }
  Ubication.init(
    {
      medicalCenterName: DataTypes.STRING,
      office: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ubication',
    },
  );
  return Ubication;
};
