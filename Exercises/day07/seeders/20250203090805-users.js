'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    let users = [];
    for(let i = 0; i<=100; i++){
      const role = faker.helpers.arrayElement(['Admin','User']);
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(),10),
        age: faker.number.int({min: 16,max: 99}),
        role: role,
        isActive: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    
    await queryInterface.bulkInsert('users',users,{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',null,{});
    
  }
};
