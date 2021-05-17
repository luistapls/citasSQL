'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.User);
      UserRole.belongsTo(models.Role);
    }
  }
  UserRole.init(
    {},
    {
      sequelize,
      modelName: 'user_role',
    },
  );
  return UserRole;
};
