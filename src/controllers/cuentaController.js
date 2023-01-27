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
exports.cuentaController = void 0;
const database_1 = __importDefault(require("../database"));

class CuentaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = yield database_1.default.query('SELECT * FROM cuenta');
            res.json(cuenta);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cuenta = yield database_1.default.query('SELECT * FROM cuenta WHERE id_cuenta = ?', [id]);
            if (cuenta.length > 0) {
                return res.json(cuenta);
            }
            res.status(404).json({ text: "Cuenta doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const{nombre_empleado, apellido_empleado,cedula_empleado,horas_laboradas,nombre_departamento,descripcion_cargo} = req.body;
            const newCuenta = {}
            yield database_1.default.query('INSERT INTO cuenta set?', [newCuenta]);
            res.json({ message: 'Cuenta saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE cuenta set ? WHERE id_cuenta = ?', [req.body, id]);
            res.json({ message: 'Cuenta was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM cuenta WHERE id_cuenta = ?', [id]);
            res.json({ message: 'Cuenta was deleted' });
        });
    }
    //calcular  el total de las cuentas, activos, pasivos, etc
    cuentasPasivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            //Balance General
            //cálculo de cuentas por pagar
            const cuentasPorPagar = yield database_1.default.query('SELECT SUM(VALOR_CUENTA) as MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA= 7')
            const stringCuentasPorPagar = JSON.parse(JSON.stringify(cuentasPorPagar))
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA = ? WHERE ID_CUENTA=7',[stringCuentasPorPagar[0].MONTO_CUENTA])
            //cálculo de Pasivos corrientes
            const pasivosCorrientes = yield database_1.default.query('SELECT SUM(VALOR_CUENTA) as MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA= 6')
            const stringPasivosCorrientes = JSON.parse(JSON.stringify(pasivosCorrientes))
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA = ? WHERE ID_CUENTA=6',[stringPasivosCorrientes[0].MONTO_CUENTA])
            //cálculo de pasivos
            const pasivos = yield database_1.default.query('SELECT SUM(VALOR_CUENTA) as MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA= 5')
            const stringPasivos = JSON.parse(JSON.stringify(pasivos))
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA = ? WHERE ID_CUENTA=5',[stringPasivos[0].MONTO_CUENTA])

            res.json({ message: 'cuentas actualizadas' });
        });
    }
}
exports.cuentaController = new CuentaController();