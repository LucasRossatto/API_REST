const Conta = require("../models/conta");
const Cliente = require("../models/cliente");

const contaController = {
  create: async (req, res) => {
    try {
      const { ID_Cliente, Saldo } = req.body;

      const cliente = await Cliente.findByPk(ID_Cliente);
      if (!cliente) {
        return res.status(404).json({
          msg: "Cliente não encontrado",
        });
      }

      const novaConta = await Conta.create({
        ID_Cliente,
        Saldo: Saldo || 0,
      });

      return res.status(201).json({
        msg: "Conta criada com sucesso!",
        conta: novaConta,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro ao criar conta." });
    }
  },

  getAll: async (req, res) => {
    try {
      const contas = await Conta.findAll();
      return res.status(200).json({
        msg: "Contas encontradas",
        contas,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro ao obter contas." });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const conta = await Conta.findByPk(id);

      if (!conta) {
        return res.status(404).json({
          msg: "Conta não encontrada",
        });
      }

      return res.status(200).json({
        msg: "Conta encontrada com sucesso!",
        conta,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro ao obter conta." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { saldo } = req.body;

      const conta = await Conta.findByPk(id);
      if (!conta) {
        return res.status(404).json({
          msg: "Conta não encontrada",
        });
      }

      conta.saldo = saldo || conta.saldo;
      await conta.save();

      return res.status(200).json({
        msg: "Conta atualizada com sucesso!",
        conta,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro ao atualizar conta." });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const conta = await Conta.findByPk(id);

      if (!conta) {
        return res.status(404).json({
          msg: "Conta não encontrada",
        });
      }

      await conta.destroy();

      return res.status(200).json({
        msg: "Conta deletada com sucesso",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro ao deletar conta." });
    }
  },
};

module.exports = contaController;
