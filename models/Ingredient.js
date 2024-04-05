const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ingredient: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  },

  {
    timestamps: false,
    sequelize,
    freezeTableName: false,
    modelName: 'recipe',
  }
);

module.exports = Ingredient;
