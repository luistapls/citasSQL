'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.hasMany(models.UserPermission);
      Permission.hasMany(models.RolePermission);
    }
  }
  Permission.init(
    {
      permissionType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'permission',
    },
  );
  return Permission;
};
