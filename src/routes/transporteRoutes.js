"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transporteController_1 = require("../controllers/transporteController");
class TransporteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', transporteController_1.transporteController.list);
        this.router.get('/:id', transporteController_1.transporteController.getOne);
        this.router.post('/', transporteController_1.transporteController.create);
        this.router.put('/:id', transporteController_1.transporteController.update);
        this.router.delete('/:id', transporteController_1.transporteController.delete);
    }
}
const transporteRouter = new TransporteRoutes();
exports.default = transporteRouter.router;