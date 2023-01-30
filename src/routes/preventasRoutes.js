"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preventaController_1 = require("../controllers/preventaController");
class PreventaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', preventaController_1.preventaController.list);
        this.router.get('/:id', preventaController_1.preventaController.getOne);
        this.router.post('/', preventaController_1.preventaController.create);
        this.router.put('/:id', preventaController_1.preventaController.update);
        this.router.delete('/:id', preventaController_1.preventaController.delete);
    }
}
const preventaRouter = new PreventaRoutes();
exports.default = preventaRouter.router;