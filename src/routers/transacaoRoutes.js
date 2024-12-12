const express = require("express");
const router = express.Router();
const transacaoController = require("../controllers/transacaoController");

// Criar uma nova transação
router.post("/", transacaoController.create);

// Obter todas as transações
router.get("/", transacaoController.getAll);

// Obter uma transação específica
router.get("/:id", transacaoController.getOne);

// Atualizar uma transação
router.put("/:id", transacaoController.update);

// Deletar uma transação
router.delete("/:id", transacaoController.delete);

module.exports = router;
