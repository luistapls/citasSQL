'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Token.init(
    {
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Token',
      timestamps: true,
      paranoid: true,
      deletedAt: 'delete_at',
      createdAt: 'create_at',
      updatedAt: 'update_at',
      tableName: 'tokens',
    },
  );
  return Token;
};
