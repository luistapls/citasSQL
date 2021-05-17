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
      User.hasMany(models.UserPermission);
      User.hasMany(models.UserRole);
      User.hasOne(models.Token);
      User.hasOne(models.Patient);
      User.hasOne(models.Doctor);
      User.hasOne(models.Clinic);
    }
  }
  User.init(
    {
      userEmail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return User;
};
