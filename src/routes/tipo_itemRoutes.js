"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_itemController_1 = require("../controllers/tipo_itemController");
class Tipo_ItemRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipo_itemController_1.tipo_itemController.list);
        this.router.get('/:id', tipo_itemController_1.tipo_itemController.getOne);
        this.router.post('/', tipo_itemController_1.tipo_itemController.create);
        this.router.put('/:id', tipo_itemController_1.tipo_itemController.update);
        this.router.delete('/:id', tipo_itemController_1.tipo_itemController.delete);
    }
}
const tipo_itemRouter = new Tipo_ItemRoutes();
exports.default = tipo_itemRouter.router;