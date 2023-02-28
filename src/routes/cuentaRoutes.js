"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentaController_1 = require("../controllers/cuentaController");
class CuentaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cuentaController_1.cuentaController.list);
        this.router.get('/:id', cuentaController_1.cuentaController.getOne);
        this.router.post('/', cuentaController_1.cuentaController.create);
        this.router.put('/:id', cuentaController_1.cuentaController.update);
        this.router.delete('/:id', cuentaController_1.cuentaController.delete);
        this.router.get('/cuentasCostosGastos/:id', cuentaController_1.cuentaController.cuentasCostosGastos);
        this.router.get('/cuentasInventario/:id', cuentaController_1.cuentaController.cuentasInventario);
        this.router.get('/cuentasPedidos/:id', cuentaController_1.cuentaController.cuentasPedidos);

    }
}
const cuentaRouter = new CuentaRoutes();
exports.default = cuentaRouter.router;