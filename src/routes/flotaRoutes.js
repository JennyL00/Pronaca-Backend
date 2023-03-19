"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flotaController_1 = require("../controllers/flotaController");
class FlotaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', flotaController_1.flotaController.list);
        this.router.get('/:id', flotaController_1.flotaController.getOne);
        this.router.post('/', flotaController_1.flotaController.create);
        this.router.put('/:id', flotaController_1.flotaController.update);
        this.router.delete('/:id', flotaController_1.flotaController.delete);
    }
}
const flotaRouter = new FlotaRoutes();
exports.default = flotaRouter.router;