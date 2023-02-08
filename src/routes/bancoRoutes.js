"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bancoController_1 = require("../controllers/bancoController");
class BancoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bancoController_1.bancoController.list);
        this.router.get('/:id', bancoController_1.bancoController.getOne);
        this.router.post('/', bancoController_1.bancoController.create);
        this.router.put('/:id', bancoController_1.bancoController.update);
        this.router.delete('/:id', bancoController_1.bancoController.delete);
    }
}
const bancoRouter = new BancoRoutes();
exports.default = bancoRouter.router;