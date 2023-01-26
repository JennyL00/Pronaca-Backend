"use strict";

const { database } = require("../keys");

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
exports.informe_financieroController = void 0;
const database_1 = __importDefault(require("../database"));

class Informe_FinancieroController {
    cuentas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            //Balance General
            //cálculo de cuentas por pagar
            const cuentasPorPagar = yield database_1.default.query('SELECT SUM(VALOR_CUENTA) as MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA= 7')
            const stringCuentasPorPagar = JSON.parse(JSON.stringify(cuentasPorPagar))
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA = ? WHERE ID_CUENTA=7',[stringCuentasPorPagar[0].MONTO_CUENTA])
            //cálculo de Pasivos corrientes
            const pasivosCorrientes = yield database_1.default.query('SELECT SUM(VALOR_CUENTA) as MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA= 5')
            const stringPasivosCorrientes = JSON.parse(JSON.stringify(pasivosCorrientes))
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA = ? WHERE ID_CUENTA=6',[stringPasivosCorrientes[0].MONTO_CUENTA])
            //cálculo de pasivos
            const pasivos = yield database_1.default.query('SELECT SUM(VALOR_CUENTA) as MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA= 7')
            const stringPasivos = JSON.parse(JSON.stringify(pasivos))
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA = ? WHERE ID_CUENTA=6',[stringCuentasPorPagar[0].MONTO_CUENTA])

            res.json({ message: 'cuentas actualizadas' });
        });

    }
    
}
exports.informe_financieroController = new Informe_FinancieroController();