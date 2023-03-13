"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoProveedorController_1 = require("../controllers/pedidoProveedorController");
class PedidoProveedorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pedidoProveedorController_1.pedidoProveedorController.list);
        this.router.get('/:id', pedidoProveedorController_1.pedidoProveedorController.getOne);
        this.router.post('/', pedidoProveedorController_1.pedidoProveedorController.create);
        this.router.put('/:id', pedidoProveedorController_1.pedidoProveedorController.update);
        this.router.delete('/:id', pedidoProveedorController_1.pedidoProveedorController.delete);
    }
}
const pedidoProveedorRouter = new PedidoProveedorRoutes();
exports.default = pedidoProveedorRouter.router;