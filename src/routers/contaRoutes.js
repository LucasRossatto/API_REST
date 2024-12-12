const express = require("express");
const router = express.Router();
const contaController = require("../controllers/contasController");

router.post("/", contaController.create);
router.get("/", contaController.getAll);
router.get("/:id", contaController.getOne);
router.put("/:id", contaController.update);
router.delete("/:id", contaController.delete);

module.exports = router;
