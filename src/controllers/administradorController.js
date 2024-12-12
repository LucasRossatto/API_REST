const Administradores = require('../models/administrador');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const administradorController = {
  create: async function criarAdministrador(req, res) {
    const { Nome, Email, Idade, Senha } = req.body;

    try {
      const senhaHash = await bcrypt.hash(Senha, 10); // Criptografando a senha
      const novoAdministrador = await Administradores.create({ Nome, Email, Idade, Senha: senhaHash });

      return res.status(201).json({ admin: novoAdministrador});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  login: async function loginAdministrador(req, res) {
    const { email, senha } = req.body;

    try {
      const administrador = await Administradores.findOne({ where: { email } });

      if (!administrador) {
        return res.status(404).json({ message: "Administrador não encontrado." });
      }

      const senhaValida = await bcrypt.compare(senha, administrador.senha);

      if (!senhaValida) {
        return res.status(400).json({ message: "Senha incorreta." });
      }

      // Gerando o token JWT
      const token = jwt.sign({ id: administrador.ID_Administrador, email: administrador.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao fazer login." });
    }
  },

  getAll: async function obterAdministradores(req, res) {
    try {
      const administradores = await Administradores.findAll();
      return res.status(200).json(administradores);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao obter administradores." });
    }
  },

  // Obter um administrador específico por ID
  getOne: async function obterAdministradorPorId(req, res) {
    const { id } = req.params;

    try {
      const administrador = await Administradores.findByPk(id);

      if (!administrador) {
        return res.status(404).json({ message: "Administrador não encontrado." });
      }

      return res.status(200).json(administrador);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao obter administrador." });
    }
  },

  update: async function atualizarAdministrador(req, res) {
    const { id } = req.params;
    const { nome, email, idade, senha } = req.body;

    try {
      const administrador = await Administradores.findByPk(id);

      if (!administrador) {
        return res.status(404).json({ message: "Administrador não encontrado." });
      }

      administrador.nome = nome || administrador.nome;
      administrador.email = email || administrador.email;
      administrador.idade = idade || administrador.idade;

      // Se uma nova senha for fornecida, ela será atualizada após criptografá-la
      if (senha) {
        administrador.senha = await bcrypt.hash(senha, 10);
      }

      await administrador.save();
      return res.status(200).json(administrador);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao atualizar administrador." });
    }
  },

  delete: async function deletarAdministrador(req, res) {
    const { id } = req.params;

    try {
      const administrador = await Administradores.findByPk(id);

      if (!administrador) {
        return res.status(404).json({ message: "Administrador não encontrado." });
      }

      await administrador.destroy();
      return res.status(204).json({ message: "Administrador deletado com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao deletar administrador." });
    }
  },
};

module.exports = administradorController;
