"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargo_empleadoController_1 = require("../controllers/cargo_empleadoController");
class Cargo_EmpleadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cargo_empleadoController_1.cargo_empleadoController.list);
        this.router.get('/:id', cargo_empleadoController_1.cargo_empleadoController.getOne);
        this.router.post('/:id', cargo_empleadoController_1.cargo_empleadoController.create);
        this.router.put('/:id', cargo_empleadoController_1.cargo_empleadoController.update);
        this.router.delete('/:id', cargo_empleadoController_1.cargo_empleadoController.delete);
    }
}
const cargo_empleadoRouter = new Cargo_EmpleadoRoutes();
exports.default = cargo_empleadoRouter.router;