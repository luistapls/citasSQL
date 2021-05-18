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
      Doctor.belongsTo(models.User, { foreignKey: 'user_id' });
      Doctor.hasMany(models.Journey, { foreignKey: 'doctor_id' });
    }
  }
  Doctor.init(
    {
      doctor_name: DataTypes.STRING,
      doctor_specialty: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'doctor',
    },
  );
  return Doctor;
};
