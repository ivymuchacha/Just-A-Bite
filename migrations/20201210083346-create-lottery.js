'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lotteries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prize: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prize_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prize_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prize_weights: {
        type: Sequelize.INTEGER
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lotteries');
  }
};