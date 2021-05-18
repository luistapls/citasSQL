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
      Permission.hasMany(models.UserPermission, {
        foreignKey: 'permission_id',
      });
    }
  }
  Permission.init(
    {
      permission_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'permission',
    },
  );
  return Permission;
};
