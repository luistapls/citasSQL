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
      Appointment.belongsTo(models.Patient);
      Appointment.belongsTo(models.Journey);
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
