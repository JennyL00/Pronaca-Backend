"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemventaController_1 = require("../controllers/itemventaController");
class ItemVentaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', itemventaController_1.itemventasController.list_productos);
    }
}
const itemventaRouter = new ItemVentaRoutes();
exports.default = itemventaRouter.router;