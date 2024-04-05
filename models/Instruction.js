const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Instruction extends Model { }

Instruction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    step: {
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
    tableName: 'instruction',
  }
);

module.exports = Instruction;