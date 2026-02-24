'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StarsPlanets', [
      { planetId: 1, starId: 1, createdAt: new Date(), updatedAt: new Date() },
      { planetId: 2, starId: 1, createdAt: new Date(), updatedAt: new Date() },
      { planetId: 3, starId: 2, createdAt: new Date(), updatedAt: new Date() },
      { planetId: 1, starId: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StarsPlanets', null, {});
  }
};
