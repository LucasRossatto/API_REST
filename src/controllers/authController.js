const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administradores = require('../models/administrador');

async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const admin = await Administradores.findOne({ where: { Email: email } });

    if (!admin) {
      return res.status(401).json({ message: 'Administrador não encontrado' });
    }

    const validPassword = await bcrypt.compare(senha, admin.Senha);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: admin.ID_Administrador }, process.env.SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

module.exports = { login };
