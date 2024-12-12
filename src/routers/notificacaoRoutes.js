const express = require("express");
const router = express.Router();
const notificacaoController = require("../controllers/notificacaoController");

router.post("/", notificacaoController.create);
router.get("/", notificacaoController.getAll);
router.get("/:id", notificacaoController.getOne);
router.put("/:id", notificacaoController.update);
router.delete("/:id", notificacaoController.delete);

module.exports = router;
