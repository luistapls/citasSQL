'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasOne(models);
    }
  }
  Rol.init(
    {
      rolName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'rol',
    },
  );
  return Rol;
};
