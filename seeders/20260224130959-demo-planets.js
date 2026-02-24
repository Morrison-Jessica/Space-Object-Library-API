'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Fixed IDs so join-seeder rows can reference these records
    await queryInterface.bulkInsert('Planets', [
      {
        id: 1,
        name: 'Terra',
        size: 12742,
        description: 'Rocky, Earth-like planet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Aurelia',
        size: 139820,
        description: 'Gas giant with storm systems',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Crimson-9',
        size: 6779,
        description: 'Cold desert world',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Planets', null, {});
  }
};
