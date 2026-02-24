'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Fixed IDs so join-seeder rows can reference these records
    await queryInterface.bulkInsert('Stars', [
      {
        id: 1,
        name: 'Sol',
        size: 1392000,
        description: 'Yellow dwarf star',
        galaxyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Proxima Centauri',
        size: 863000,
        description: 'Red dwarf star',
        galaxyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Rigel',
        size: 1700000000,
        description: 'Blue supergiant star',
        galaxyId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stars', null, {});
  }
};
