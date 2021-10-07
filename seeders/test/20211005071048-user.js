'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      username: 'test1',
      password: await bcrypt.hash('password', 10),
      auth_token: null,
      ref_token: null,
      createdAt: new Date(),
      updatedAt: new Date()

    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
