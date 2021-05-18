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
      Patient.belongsTo(models.User, { foreignKey: 'user_id' });
      Patient.hasMany(models.Appointment, { foreignKey: 'patient_id' });
    }
  }
  Patient.init(
    {
      patient_name: DataTypes.STRING,
      patient_age: DataTypes.INTEGER,
      patient_problem: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'patient',
    },
  );
  return Patient;
};
