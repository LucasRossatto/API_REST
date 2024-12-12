const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Clientes = sequelize.define(
  "Clientes",
  {
    ID_Cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    Nome_Cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        index: true, 
      },
      
  },
  {
    timestamps: true, 
  }
);

module.exports = Clientes;
