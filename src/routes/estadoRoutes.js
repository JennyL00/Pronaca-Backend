"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadoController_1 = require("../controllers/estadoController");

class estadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', estadoController_1.estadoController.list);
        this.router.get('/:id', estadoController_1.estadoController.getOne);
        this.router.post('/', estadoController_1.estadoController.create);
        
    }
}
const estadoRouter = new estadoRoutes();
exports.default = estadoRouter.router;