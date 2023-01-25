"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lista_itemsController_1 = require("../controllers/lista_itemsController");
class Lista_ItemsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', lista_itemsController_1.lista_itemsController.list);
        this.router.get('/:id', lista_itemsController_1.lista_itemsController.getOne);
        this.router.post('/', lista_itemsController_1.lista_itemsController.create);
        this.router.put('/:id', lista_itemsController_1.lista_itemsController.update);
        this.router.delete('/:id', lista_itemsController_1.lista_itemsController.delete);
    }
}
const lista_itemsRouter = new Lista_ItemsRoutes();
exports.default = lista_itemsRouter.router;