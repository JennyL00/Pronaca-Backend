"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentoController_1 = require("../controllers/departamentoController");
class DepartamentoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', departamentoController_1.departamentoController.list);
        this.router.get('/:id', departamentoController_1.departamentoController.getOne);
        this.router.post('/', departamentoController_1.departamentoController.create);
        this.router.put('/:id', departamentoController_1.departamentoController.update);
        this.router.delete('/:id', departamentoController_1.departamentoController.delete);
    }
}
const departamentoRouter = new DepartamentoRoutes();
exports.default = departamentoRouter.router;