"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_resultados_Controller_1 = require("../controllers/estado_resultados_Controller");

class estado_resultados_Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        
    }
}
const estado_resultados_Router = new estado_resultados_Routes();
exports.default = estado_resultados_Router.router;