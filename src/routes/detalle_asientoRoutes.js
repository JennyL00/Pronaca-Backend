"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_asientoController_1 = require("../controllers/detalle_asientoController");
class Detalle_asientoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', detalle_asientoController_1.detalle_asientoController.list);
        this.router.get('/:id', detalle_asientoController_1.detalle_asientoController.getOne);
        this.router.get('/detalle/:id', detalle_asientoController_1.detalle_asientoController.getDetalleAsiento);
        this.router.post('/', detalle_asientoController_1.detalle_asientoController.create);
        this.router.put('/:id', detalle_asientoController_1.detalle_asientoController.update);
        this.router.delete('/:id', detalle_asientoController_1.detalle_asientoController.delete);
    }
}
const detalle_asientoRouter = new Detalle_asientoRoutes();
exports.default = detalle_asientoRouter.router;