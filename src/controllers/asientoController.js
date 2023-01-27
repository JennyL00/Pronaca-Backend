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
exports.asientoController = void 0;
const database_1 = __importDefault(require("../database"));

class AsientoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asiento = yield database_1.default.query('SELECT * FROM asiento');
            res.json(asiento);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asiento = yield database_1.default.query('SELECT * FROM asiento WHERE id_asiento = ?', [id]);
            if (asiento.length > 0) {
                return res.json(asiento);
            }
            res.status(404).json({ text: "Asiento doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO asiento set?', [req.body]);
            res.json({ message: 'Asiento saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE asiento set ? WHERE id_asiento = ?', [req.body, id]);
            res.json({ message: 'Asiento was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM asiento WHERE id_asiento = ?', [id]);
            res.json({ message: 'Asiento was deleted' });
        });
    }
    //Asignar el debe y hacer del total de las cuentas, activos, pasivos, etc
    cuentasAsiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            //Balance General
            //asignar asiento activos
            for(let i=1; i<=4; i++){
                const activos = yield database_1.default.query('SELECT * FROM CUENTA WHERE ID_CUENTA=?',[i]);
                const stringActivos = JSON.parse(JSON.stringify(activos))     
                yield database_1.default.query('UPDATE ASIENTO SET DEBE = ? WHERE ID_ASIENTO=?',[stringActivos[0].VALOR_CUENTA, i])

            }
            //asignar asiento pasivos
            for(let i=5; i<=8; i++){
                const pasivos = yield database_1.default.query('SELECT * FROM CUENTA WHERE ID_CUENTA=?',[i]);
                const stringPasivos = JSON.parse(JSON.stringify(pasivos))     
                yield database_1.default.query('UPDATE ASIENTO SET HABER = ? WHERE ID_ASIENTO=?',[stringPasivos[0].VALOR_CUENTA, i])
            }
            //asignar patrimonio, ingresos
            for(let i=9; i<=11; i++){
                const patrIngr = yield database_1.default.query('SELECT * FROM CUENTA WHERE ID_CUENTA=?',[i]);
                const stringPatrIngr = JSON.parse(JSON.stringify(patrIngr))     
                yield database_1.default.query('UPDATE ASIENTO SET DEBE = ? WHERE ID_ASIENTO=?',[stringPatrIngr[0].VALOR_CUENTA, i])
            }
            //asignar costo-gastos
            for(let i=12; i<=18; i++){
                const costGastos = yield database_1.default.query('SELECT * FROM CUENTA WHERE ID_CUENTA=?',[i]);
                const stringCostGastos = JSON.parse(JSON.stringify(costGastos))     
                yield database_1.default.query('UPDATE ASIENTO SET DEBE = ? WHERE ID_ASIENTO=?',[stringCostGastos[0].VALOR_CUENTA, i])
            }
            
            res.json({ message: 'asientos actualizados' });
        });
    }
}
exports.asientoController = new AsientoController();