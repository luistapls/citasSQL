'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models, caseAssociation) {
      switch (caseAssociation) {
        case 'belongsTo':
          Appointment.belongsTo(models);
          break;
        case 'hasOne':
          Appointment.hasOne(models);
          break;
      }
    }
  }
  Appointment.init(
    {
      startAppointment: DataTypes.DATE,
      endAppointment: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'appointment',
    },
  );
  return Appointment;
};
