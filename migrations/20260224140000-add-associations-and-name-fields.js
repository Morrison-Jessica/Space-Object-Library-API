'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Planets', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Stars', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Galaxies', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Planets', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.changeColumn('Stars', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.changeColumn('Galaxies', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('Stars', 'galaxyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Galaxies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Initial join table (renamed later to StarsPlanets)
    await queryInterface.createTable('PlanetStars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Planets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      starId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('PlanetStars', {
      fields: ['planetId', 'starId'],
      type: 'unique',
      name: 'planetstars_planetid_starid_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('PlanetStars', 'planetstars_planetid_starid_unique');
    await queryInterface.dropTable('PlanetStars');

    await queryInterface.removeColumn('Stars', 'galaxyId');

    await queryInterface.changeColumn('Galaxies', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Stars', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Planets', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.removeColumn('Galaxies', 'name');
    await queryInterface.removeColumn('Stars', 'name');
    await queryInterface.removeColumn('Planets', 'name');
  }
};
