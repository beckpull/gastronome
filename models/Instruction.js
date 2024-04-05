const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Instruction extends Model {}

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
  },

  {
    timestamps: false,
    sequelize,
    freezeTableName: false,
    modelName: 'recipe',
  }
);

module.exports = Instruction;