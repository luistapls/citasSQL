'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Journey.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
      Journey.belongsTo(models.Clinic, { foreignKey: 'clinic_id' });
    }
  }
  Journey.init(
    {
      journey_start: DataTypes.DATE,
      journey_end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'journey',
    },
  );
  return Journey;
};
