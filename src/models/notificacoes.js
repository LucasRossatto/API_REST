const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notificacoes = sequelize.define(
  "Notificacoes", 
  {
    ID_Notificacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    ID_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Clientes",  
        key: "ID_Cliente",  
      },
    },
    Mensagem: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 255], 
      },
    },
    Data_Notificacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = Notificacoes;
