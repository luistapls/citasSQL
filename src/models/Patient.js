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
      Patient.belongsTo(models.User);
      Patient.hasMany(models.Appointment);
    }
  }
  Patient.init(
    {
      patientName: DataTypes.STRING,
      patientAge: DataTypes.INTEGER,
      patientProblem: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'patient',
    },
  );
  return Patient;
};
