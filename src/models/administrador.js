const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Administradores = sequelize.define(
  "Administradores",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nome: {
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
    Idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Administradores;
