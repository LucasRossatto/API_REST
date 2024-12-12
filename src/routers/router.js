const { Router } = require("express");
const clienteRoutes = require("../routers/clienteRoutes");
const contasRoutes = require("../routers/contaRoutes");
const administradorRoutes = require("../routers/administradorRoutes");
const notificacaoRoutes = require("../routers/notificacaoRoutes");
const transacaoRoutes = require("../routers/transacaoRoutes");

const router = Router();

router.use("/clientes", clienteRoutes);
router.use("/adm", administradorRoutes);
router.use("/contas", contasRoutes);
router.use("/notificacoes", notificacaoRoutes);
router.use("/transacao", transacaoRoutes);

module.exports = router;
