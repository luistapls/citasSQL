'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Token, { foreignKey: 'user_id' });
      User.hasMany(models.UserPermission, {
        as: 'user_permissions',
        foreignKey: 'user_id',
      });
      User.hasOne(models.Appointment, {
        foreignKey: 'doctor_id',
      });
      User.hasOne(models.Appointment, {
        foreignKey: 'patient_id',
      });
    }
  }
  User.init(
    {
      user_email: DataTypes.STRING,
      user_name: DataTypes.STRING,
      user_age: DataTypes.INTEGER,
      user_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    },
  );
  return User;
};
