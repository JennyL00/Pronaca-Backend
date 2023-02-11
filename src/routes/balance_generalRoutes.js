"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balance_generalController_1 = require("../controllers/balance_generalController");

class balance_generalRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        
    }
}
const balance_general_Router = new balance_generalRoutes();
exports.default = balance_general_Router.router;