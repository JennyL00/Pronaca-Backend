"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ubicacionController_1 = require("../controllers/ubicacionController");
class UbicacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ubicacionController_1.ubicacionController.list);
        this.router.get('/:id', ubicacionController_1.ubicacionController.getOne);
        this.router.post('/', ubicacionController_1.ubicacionController.create);
        this.router.put('/:id', ubicacionController_1.ubicacionController.update);
        this.router.delete('/:id', ubicacionController_1.ubicacionController.delete);
    }
}
const ubicacionRouter = new UbicacionRoutes();
exports.default = ubicacionRouter.router;