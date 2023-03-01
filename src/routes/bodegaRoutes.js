"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodegaController_1 = require("../controllers/bodegaController");
class BodegaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bodegaController_1.bodegaController.list);
        this.router.get('/:id', bodegaController_1.bodegaController.getQuantity);
        this.router.post('/', bodegaController_1.bodegaController.create);
        this.router.put('/:id', bodegaController_1.bodegaController.update);
        this.router.delete('/:id', bodegaController_1.bodegaController.delete);
    }
}
const bodegaRouter = new BodegaRoutes();
exports.default = bodegaRouter.router;