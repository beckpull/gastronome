const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model { }

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ingredient: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipe',
        key: 'id'
      },
    },
  },

  {
    timestamps: false,
    sequelize,
    freezeTableName: false,
    tableName: 'ingredient',
  }
);

module.exports = Ingredient;
