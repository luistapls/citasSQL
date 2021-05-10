'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cita', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      appointmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'appointments',
          key: 'id',
        },
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cita');
  },
};
