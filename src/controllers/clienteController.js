const Clientes = require("../models/cliente")

const clienteController = {
  create: async function criarCliente(req, res) {
    const { Nome_Cliente, Email } = req.body;

    try {
      const clienteExistente = await Clientes.findOne({ where: { Email } });

      if (clienteExistente) {
        return res
          .status(400)
          .json({ message: "Cliente já existe com esse e-mail." });
      }

      const novoCliente = await Clientes.create({ Nome_Cliente, Email });
      return res.status(201).json(novoCliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao criar cliente." });
    }
  },

  getAll: async function obterClientes(req, res) {
    try {
      const clientes = await Clientes.findAll();
      return res.status(200).json(clientes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao obter clientes." });
    }
  },

  getOne: async function obterClientePorId(req, res) {
    const { id } = req.params;

    try {
      const cliente = await Clientes.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }

      return res.status(200).json(cliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao obter cliente." });
    }
  },

  update: async function atualizarCliente(req, res) {
    const { id } = req.params;
    const { Nome_Cliente, Email } = req.body;

    try {
      const cliente = await Clientes.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }

      cliente.Nome_Cliente = Nome_Cliente || cliente.Nome_Cliente;
      cliente.Email = Email || cliente.Email;

      await cliente.save();
      return res.status(200).json(cliente);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao atualizar cliente." });
    }
  },

  // Deletar um cliente
  delete: async function deletarCliente(req, res) {
    const { id } = req.params;

    try {
      const cliente = await Clientes.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }

      await cliente.destroy();
      return res.status(204).json({ message: "Cliente deletado com sucesso." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao deletar cliente." });
    }
  },
};

module.exports = clienteController;
