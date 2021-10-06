'use strict';
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('user', [{
      username: 'John Doe',
      password: await bcrypt.hash('password',10),
      auth_token:jwt.sign({
        id:1,
        username:'John Doe'
      },'access',{expiresIn:'20s'}),
      ref_token:jwt.sign({
        id:1,
        username:'John Doe'
      },'refresh',{expiresIn:'24h'}),
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
     await queryInterface.bulkDelete('user', null, {});
  }
};
