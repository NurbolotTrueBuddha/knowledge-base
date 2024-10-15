'use strict';

const { transaction_reasons, users, articles } = require('../relations');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(articles, {
      user_email: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: users,
          key: 'email',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      tags: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(articles);
  },
};
