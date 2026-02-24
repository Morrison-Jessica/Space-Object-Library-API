'use strict';
// 💛 Sequelize model file: StarsPlanets (join table model)

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    static associate(models) {
      StarsPlanets.belongsTo(models.Star, {
        foreignKey: 'starId',
        as: 'star'
      });

      StarsPlanets.belongsTo(models.Planet, {
        foreignKey: 'planetId',
        as: 'planet'
      });
    }
  }

  StarsPlanets.init(
    {
      starId: DataTypes.INTEGER,
      planetId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'StarsPlanets',
      tableName: 'StarsPlanets'
    }
  );

  return StarsPlanets;
};
