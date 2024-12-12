const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transacoes = sequelize.define(
  "Transacoes", // Nome da tabela
  {
    ID_Transacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    ID_Conta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Contas", 
        key: "Id", 
      },
    },
    Tipo_Conta: {
      type: DataTypes.ENUM(
        "Corrente",
        "Poupança",
        "Salário",
        "Mista",
        "Digital",
        "Universitária",
        "Conjunta",
        "Solidária"
      ),
      allowNull: false,
    },
    Tipo_Transacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Valor: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      validate: {
        isDecimal: true, 
        min: 0, 
      },
    },
    Data_Transacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = Transacoes;
