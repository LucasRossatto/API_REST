const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/administradorController");

router.post("/", administradorController.create);

router.post("/login", administradorController.login);

router.get("/", administradorController.getAll);

router.get("/:id", administradorController.getOne);

router.put("/:id", administradorController.update);

router.delete("/:id", administradorController.delete);

module.exports = router;
