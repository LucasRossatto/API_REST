const Notificacao = require("../models/notificacoes");
const Cliente = require("../models/cliente");

const notificacaoController = {
  // Criar uma nova notificação
  create: async (req, res) => {
    const { ID_Cliente, Mensagem } = req.body;

    // Validar entrada
    if (!ID_Cliente || !Mensagem) {
      return res.status(400).json({
        message: "ID_Cliente e Mensagem são obrigatórios.",
      });
    }

    try {
      // Verificar se o cliente existe
      const cliente = await Cliente.findByPk(ID_Cliente);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }

      // Definir a data automaticamente como a data atual
      const novaNotificacao = await Notificacao.create({
        ID_Cliente,
        Mensagem,
        Data_Notificacao: new Date(),  // Data atual
      });

      return res.status(201).json({
        message: "Notificação criada com sucesso.",
        notificacao: novaNotificacao,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar notificação." });
    }
  },

  // Obter todas as notificações
  getAll: async (req, res) => {
    try {
      const notificacoes = await Notificacao.findAll();

      if (notificacoes.length === 0) {
        return res.status(404).json({ message: "Nenhuma notificação encontrada." });
      }

      return res.status(200).json(notificacoes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter notificações." });
    }
  },

  // Obter uma notificação específica
  getOne: async (req, res) => {
    const { id } = req.params;

    try {
      const notificacao = await Notificacao.findByPk(id);

      if (!notificacao) {
        return res.status(404).json({ message: "Notificação não encontrada." });
      }

      return res.status(200).json(notificacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao obter notificação." });
    }
  },

  // Atualizar uma notificação
  update: async (req, res) => {
    const { id } = req.params;
    const { Mensagem } = req.body;

    // Validar entrada
    if (!Mensagem) {
      return res.status(400).json({ message: "Mensagem é obrigatória para atualização." });
    }

    try {
      const notificacao = await Notificacao.findByPk(id);

      if (!notificacao) {
        return res.status(404).json({ message: "Notificação não encontrada." });
      }

      notificacao.Mensagem = Mensagem;

      await notificacao.save();
      return res.status(200).json({
        message: "Notificação atualizada com sucesso.",
        notificacao,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar notificação." });
    }
  },

  // Deletar uma notificação
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const notificacao = await Notificacao.findByPk(id);

      if (!notificacao) {
        return res.status(404).json({ message: "Notificação não encontrada." });
      }

      await notificacao.destroy();
      return res.status(204).json({ message: "Notificação deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar notificação." });
    }
  },
};

module.exports = notificacaoController;
