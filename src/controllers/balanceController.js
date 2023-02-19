"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceController = void 0;
const database_1 = __importDefault(require("../database"));


class balanceController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield database_1.default.query('SELECT * FROM `informe_financiero` WHERE TIPO_INFORME = "Balance"');
            res.json(balance);    
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            res.status(404).json({ text: "Balances doesn't exists" });
        });
    }

    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        const {  date_init, date_end, activos, pasivos, patrimonio } = req.body;
        
        const id_informe = Math.floor(Math.random() * 1000000);
        const date_informe = new Date().toISOString().substring(0, 10);
        // Create a financial report
        
        const newInformeFinanciero = {
          id_informe,
          fecha: date_informe,
          activos,
          pasivos,
          patrimonio:4738168900
        };
        
        yield database_1.default.query(`INSERT INTO INFORME_FINANCIERO (ID_INFORME_FINANCIERO, TIPO_INFORME, FECHA) VALUES (${id_informe}, 'Balance', '${date_informe}')`);
        yield database_1.default.query(`INSERT INTO BALANCE_GENERAL (ID_INFORME_FINANCIERO, FECHA, ACTIVOS, PASIVOS, PATRIMONIO) VALUES (${newInformeFinanciero.id_informe}, '${newInformeFinanciero.fecha}', ${newInformeFinanciero.activos}, ${newInformeFinanciero.pasivos}, ${newInformeFinanciero.patrimonio})`);
        
        res.json({ message: 'Financial report Balance saved' });
        
        
        });
        }
      
        
        

}
exports.balanceController = new balanceController();