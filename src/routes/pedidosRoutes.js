"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = require("../controllers/pedidoController");
class PedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pedidoController_1.pedidoController.list);
        this.router.get('/:id', pedidoController_1.pedidoController.getOne);
        this.router.post('/', pedidoController_1.pedidoController.create);
        this.router.put('/:id', pedidoController_1.pedidoController.update);
        this.router.delete('/:id', pedidoController_1.pedidoController.delete);
    }
}
const pedidoRouter = new PedidoRoutes();
exports.default = pedidoRouter.router;