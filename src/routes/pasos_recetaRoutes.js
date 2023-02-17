"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pasos_recetaController_1 = require("../controllers/pasos_recetaController");
class Pasos_RecetaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pasos_recetaController_1.pasos_recetaController.list);
        this.router.get('/:id', pasos_recetaController_1.pasos_recetaController.getOne);
        this.router.post('/', pasos_recetaController_1.pasos_recetaController.create);
        this.router.put('/:id', pasos_recetaController_1.pasos_recetaController.update);
        this.router.delete('/:id', pasos_recetaController_1.pasos_recetaController.delete);
    }
}
const pasos_recetaRouter = new Pasos_RecetaRoutes();
exports.default = pasos_recetaRouter.router;