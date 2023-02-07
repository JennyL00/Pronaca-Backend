"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const receta_produccionController_1 = require("../controllers/receta_produccionController");
class Receta_ProduccionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', receta_produccionController_1.receta_produccionController.list);
        this.router.get('/:id', receta_produccionController_1.receta_produccionController.getOne);
        this.router.post('/', receta_produccionController_1.receta_produccionController.create);
        this.router.put('/:id', receta_produccionController_1.receta_produccionController.update);
        this.router.delete('/:id', receta_produccionController_1.receta_produccionController.delete);
    }
}
const receta_produccionRouter = new Receta_ProduccionRoutes();
exports.default = receta_produccionRouter.router;