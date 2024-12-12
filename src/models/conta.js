const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contas = sequelize.define(
    "Contas",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Saldo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      ID_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clientes", 
          key: "ID_Cliente",
        },
      },
    },
    {
      timestamps: true,
    }
  );
  

module.exports = Contas;
