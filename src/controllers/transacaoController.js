const Transacoes = require("../models/transacao");
const Contas = require("../models/conta");

const transacaoController = {
  // Criar uma nova transação
  create: async (req, res) => {
    const { ID_Conta, Tipo_Conta, Tipo_Transacao, Valor } = req.body;

    // Validar dados de entrada
    if (!ID_Conta || !Tipo_Conta || !Tipo_Transacao || !Valor) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      // Verificar se a conta existe
      const conta = await Contas.findByPk(ID_Conta);
      if (!conta) {
        return res.status(404).json({ message: "Conta não encontrada." });
      }

      // Criar a transação
      const novaTransacao = await Transacoes.create({
        ID_Conta,
        Tipo_Conta,
        Tipo_Transacao,
        Valor,
        Data_Transacao: new Date(),  // Usar a data do momento
      });

      return res.status(201).json({
        message: "Transação criada com sucesso.",
        transacao: novaTransacao,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar transação." });
    }
  },

  // Obter todas as transações
  getAll: async (req, res) => {
    try {
      const transacoes = await Transacoes.findAll();
      if (transacoes.length === 0) {
        return res.status(404).json({ message: "Nenhuma transação encontrada." });
      }

      return res.status(200).json(transacoes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter transações." });
    }
  },

  // Obter uma transação específica
  getOne: async (req, res) => {
    const { id } = req.params;

    try {
      const transacao = await Transacoes.findByPk(id);
      if (!transacao) {
        return res.status(404).json({ message: "Transação não encontrada." });
      }

      return res.status(200).json(transacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter transação." });
    }
  },

  // Atualizar uma transação
  update: async (req, res) => {
    const { id } = req.params;
    const { Tipo_Transacao, Valor } = req.body;

    // Validar dados de entrada
    if (!Tipo_Transacao || !Valor) {
      return res.status(400).json({ message: "Tipo de transação e Valor são obrigatórios para atualização." });
    }

    try {
      const transacao = await Transacoes.findByPk(id);
      if (!transacao) {
        return res.status(404).json({ message: "Transação não encontrada." });
      }

      // Atualizar dados da transação
      transacao.Tipo_Transacao = Tipo_Transacao;
      transacao.Valor = Valor;

      await transacao.save();
      return res.status(200).json({
        message: "Transação atualizada com sucesso.",
        transacao,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar transação." });
    }
  },

  // Deletar uma transação
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const transacao = await Transacoes.findByPk(id);
      if (!transacao) {
        return res.status(404).json({ message: "Transação não encontrada." });
      }

      await transacao.destroy();
      return res.status(204).json({ message: "Transação deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar transação." });
    }
  },
};

module.exports = transacaoController;
