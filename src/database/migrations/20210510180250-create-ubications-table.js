'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ubications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medicalCenterName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      office: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ubications');
  },
};
