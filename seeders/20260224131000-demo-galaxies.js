'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Galaxies', [
      {
        id: 1,
        name: 'Milky Way',
        size: 100000,
        description: 'Spiral galaxy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Canis Minor Dwarf',
        size: 12000,
        description: 'Dwarf irregular galaxy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'M87',
        size: 200000,
        description: 'Massive elliptical galaxy',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Galaxies', null, {});
  }
};
