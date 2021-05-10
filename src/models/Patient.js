'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.hasOne(models);
    }
  }
  Patient.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      describeProblem: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'patient',
    },
  );
  return Patient;
};
