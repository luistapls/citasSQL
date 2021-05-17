'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RolePermission.belongsTo(models.Role);
      RolePermission.belongsTo(models.Permission);
    }
  }
  RolePermission.init(
    {},
    {
      sequelize,
      modelName: 'role_permission',
    },
  );
  return RolePermission;
};
