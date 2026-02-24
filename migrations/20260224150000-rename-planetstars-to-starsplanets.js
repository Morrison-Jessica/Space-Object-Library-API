'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const tableNames = tables.map((table) =>
      typeof table === 'string' ? table : table.tableName
    );

    // Defensive: only rename when source exists and target does not
    if (tableNames.includes('PlanetStars') && !tableNames.includes('StarsPlanets')) {
      await queryInterface.renameTable('PlanetStars', 'StarsPlanets');
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const tableNames = tables.map((table) =>
      typeof table === 'string' ? table : table.tableName
    );

    if (tableNames.includes('StarsPlanets') && !tableNames.includes('PlanetStars')) {
      await queryInterface.renameTable('StarsPlanets', 'PlanetStars');
    }
  }
};
