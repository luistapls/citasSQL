'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startAppointment: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endAppointment: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'doctors',
          key: 'id',
        },
      },
      ubicationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ubications',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appointments');
  },
};
