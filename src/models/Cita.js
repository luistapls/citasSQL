'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cita.belongsTo(models);
    }
  }
  Cita.init(
    {},
    {
      sequelize,
      modelName: 'cita',
    },
  );
  return Cita;
};
