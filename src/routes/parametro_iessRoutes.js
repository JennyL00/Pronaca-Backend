"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parametro_iessController_1 = require("../controllers/parametro_iessController");
class Parametro_IessRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', parametro_iessController_1.parametro_iessController.list);
        this.router.get('/:id', parametro_iessController_1.parametro_iessController.getOne);
        this.router.post('/', parametro_iessController_1.parametro_iessController.create);
        this.router.put('/:id', parametro_iessController_1.parametro_iessController.update);
        this.router.delete('/:id', parametro_iessController_1.parametro_iessController.delete);
    }
}
const parametro_iessRouter = new Parametro_IessRoutes();
exports.default = parametro_iessRouter.router;