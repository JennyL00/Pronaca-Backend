"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asientoController_1 = require("../controllers/asientoController");
class AsientoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', asientoController_1.asientoController.list);
        this.router.get('/:id', asientoController_1.asientoController.getOne);
        this.router.get('/newAsiento/:id', asientoController_1.asientoController.getOneAsiento);
        this.router.post('/', asientoController_1.asientoController.create);
        this.router.put('/:id', asientoController_1.asientoController.update);
        this.router.delete('/:id', asientoController_1.asientoController.delete);
    }
}
const asientoRouter = new AsientoRoutes();
exports.default = asientoRouter.router;