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
      Clinic.hasMany(models.Appointment, {
        foreignKey: 'clinic_id',
      });
    }
  }
  Clinic.init(
    {
      clinic_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Clinic',
      tableName: 'clinics',
    },
  );
  return Clinic;
};
