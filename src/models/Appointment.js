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
      Appointment.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      Appointment.belongsTo(models.Journey, { foreignKey: 'journey_id' });
    }
  }
  Appointment.init(
    {},
    {
      sequelize,
      modelName: 'appointment',
    },
  );
  return Appointment;
};
