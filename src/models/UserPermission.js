'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPermission.belongsTo(models.User);
      UserPermission.belongsTo(models.Permission);
    }
  }
  UserPermission.init(
    {},
    {
      sequelize,
      modelName: 'user_permission',
    },
  );
  return UserPermission;
};
