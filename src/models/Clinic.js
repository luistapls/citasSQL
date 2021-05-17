'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.belongsTo(models.User);
      Clinic.hasMany(models.Journey);
    }
  }
  Clinic.init(
    {
      clinicName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'clinic',
    },
  );
  return Clinic;
};
