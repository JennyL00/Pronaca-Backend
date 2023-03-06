"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_pedidoController_1 = require("../controllers/detalle_pedidoController");
class Detalle_PedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', detalle_pedidoController_1.detalle_pedidoController.list);
        this.router.get('/:id', detalle_pedidoController_1.detalle_pedidoController.getOne);
        this.router.post('/', detalle_pedidoController_1.detalle_pedidoController.create);
        this.router.put('/:id', detalle_pedidoController_1.detalle_pedidoController.update);
        this.router.delete('/:id', detalle_pedidoController_1.detalle_pedidoController.delete);
    }
}
const detalle_pedidoRouter = new Detalle_PedidoRoutes();
exports.default = detalle_pedidoRouter.router;