"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Faqs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      answer: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      is_deleted: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Faqs");
  },
};
