"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movimiento_empleadoController_1 = require("../controllers/movimiento_empleadoController");
class Movimiento_EmpleadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', movimiento_empleadoController_1.movimiento_empleadoController.list);
        this.router.get('/:id', movimiento_empleadoController_1.movimiento_empleadoController.getOne);
        this.router.post('/', movimiento_empleadoController_1.movimiento_empleadoController.create);
        this.router.put('/:id', movimiento_empleadoController_1.movimiento_empleadoController.update);
        this.router.delete('/:id', movimiento_empleadoController_1.movimiento_empleadoController.delete);
        this.router.put('/iess', movimiento_empleadoController_1.movimiento_empleadoController.updateIess);
        this.router.put('/actualizarMov/:id', movimiento_empleadoController_1.movimiento_empleadoController.updateMovimientos);

    }
}
const movimiento_empleadoRouter = new Movimiento_EmpleadoRoutes();
exports.default = movimiento_empleadoRouter.router;