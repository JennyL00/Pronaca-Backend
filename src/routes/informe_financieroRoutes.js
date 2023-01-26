"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const informe_financieroController_1 = require("../controllers/informe_financieroController");
class Informe_FinancieroRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', informe_financieroController_1.informe_financieroController.cuentas);
    }
}
const informe_financieroRouter = new Informe_FinancieroRoutes();
exports.default = informe_financieroRouter.router;