"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balanceController_1 = require("../controllers/balanceController");

class balanceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
         this.router.get('/', balanceController_1.balanceController.list);
         this.router.post('/', balanceController_1.balanceController.create);
            
            
        
    }
}
const balance_Router = new balanceRoutes();
exports.default = balance_Router.router;