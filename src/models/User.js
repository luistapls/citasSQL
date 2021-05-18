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
      User.hasMany(models.UserPermission, { foreignKey: 'user_id' });
      User.hasOne(models.Patient, { foreignKey: 'user_id' });
      User.hasOne(models.Doctor, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      user_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return User;
};
