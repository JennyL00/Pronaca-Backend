"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleadoController_1 = require("../controllers/empleadoController");
class EmpleadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', empleadoController_1.empleadoController.list);
        this.router.get('/:id', empleadoController_1.empleadoController.getOne);
        this.router.post('/', empleadoController_1.empleadoController.create);
        this.router.post('/:id', empleadoController_1.empleadoController.update);
        this.router.put('/:id', empleadoController_1.empleadoController.update);
        this.router.delete('/:id', empleadoController_1.empleadoController.delete);
    }
}
const empleadoRouter = new EmpleadoRoutes();
exports.default = empleadoRouter.router;