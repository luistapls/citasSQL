'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.User);
      Doctor.hasMany(models.Journey);
    }
  }
  Doctor.init(
    {
      doctorName: DataTypes.STRING,
      doctorSpecialty: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'doctor',
    },
  );
  return Doctor;
};
