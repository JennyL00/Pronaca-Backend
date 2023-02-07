"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_lista_producController_1 = require("../controllers/tipo_lista_producController");
class Tipo_Lista_ProducRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipo_lista_producController_1.tipo_lista_producController.list);
        this.router.get('/:id', tipo_lista_producController_1.tipo_lista_producController.getOne);
        this.router.post('/', tipo_lista_producController_1.tipo_lista_producController.create);
        this.router.put('/:id', tipo_lista_producController_1.tipo_lista_producController.update);
        this.router.delete('/:id', tipo_lista_producController_1.tipo_lista_producController.delete);
    }
}
const tipo_lista_producRouter = new Tipo_Lista_ProducRoutes();
exports.default = tipo_lista_producRouter.router;