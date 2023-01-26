"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
class ClienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clienteController_1.clienteController.list);
        this.router.get('/:id', clienteController_1.clienteController.getOne);
        this.router.post('/', clienteController_1.clienteController.create);
        this.router.put('/:id', clienteController_1.clienteController.update);
        this.router.delete('/:id', clienteController_1.clienteController.delete);
    }
}
const clienteRouter = new ClienteRoutes();
exports.default = clienteRouter.router;