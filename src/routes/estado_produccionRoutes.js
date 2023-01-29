"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_produccionController_1 = require("../controllers/estado_produccionController");
class Estado_ProduccionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', estado_produccionController_1.estado_produccionController.list);
        this.router.get('/:id', estado_produccionController_1.estado_produccionController.getOne);
        this.router.post('/', estado_produccionController_1.estado_produccionController.create);
        this.router.put('/:id', estado_produccionController_1.estado_produccionController.update);
        this.router.delete('/:id', estado_produccionController_1.estado_produccionController.delete);
    }
}
const estado_produccionRouter = new Estado_ProduccionRoutes();
exports.default = estado_produccionRouter.router;