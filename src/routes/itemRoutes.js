"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = require("../controllers/itemController");
class ItemRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', itemController_1.itemController.list);
        this.router.get('/:id', itemController_1.itemController.getOne);
        this.router.get('/p/',itemController_1.itemController.listProducts);
        this.router.post('/', itemController_1.itemController.create);
        this.router.put('/:id', itemController_1.itemController.update);
        this.router.delete('/:id', itemController_1.itemController.delete);
    }
}
const itemRouter = new ItemRoutes();
exports.default = itemRouter.router;