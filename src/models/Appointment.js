'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User, {
        as: 'doctor',
        foreignKey: 'doctor_id',
      });
      Appointment.belongsTo(models.User, {
        as: 'patient',
        foreignKey: 'patient_id',
      });
      Appointment.belongsTo(models.Clinic, {
        as: 'clinic',
        foreignKey: 'clinic_id',
      });
    }
  }
  Appointment.init(
    {
      appointment_reason: DataTypes.TEXT,
      appointment_start: DataTypes.DATE,
      appointment_end: DataTypes.DATE,
      appointment_status: DataTypes.STRING,
      appointment_specialty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
    },
  );
  return Appointment;
};
