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
exports.movimiento_empleadoController = void 0;
const database_1 = __importDefault(require("../database"));

class Movimiento_empleadoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield database_1.default.query('SELECT * FROM movimiento_empleado');
            res.json(item);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const movimiento = yield database_1.default.query('SELECT * FROM movimiento_empleado WHERE id_movimiento_empleado = ?', [id]);
            if (movimiento.length > 0) {
                return res.json(movimiento);
            }
            res.status(404).json({ text: "Movimiento empleado doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO movimiento_empleado set?', [req.body]);
            res.json({ message: 'movimiento_empleado saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE movimiento_empleado set ? WHERE id_movimiento_empleado = ?', [req.body, id]);
            res.json({ message: 'movimiento_empleado was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM movimiento_empleado WHERE id_movimiento_empleado = ?', [id]);
            res.json({ message: 'movimiento_empleado was deleted' });
        });
    }
    updateIess(req, res){
        return __awaiter(this, void 0, void 0, function* () {
            const {valor_movimiento_empleado} = req.body;
            yield database_1.default.query('UPDATE EMPLEADO SET SUELDO_NETO=SUELDO-(SUELDO*(?/100))',[valor_movimiento_empleado])
            
            yield database_1.default.query('UPDATE movimiento_empleado set valor_movimiento_empleado=? WHERE descripcion_movimiento_enpleado ="IESS"', [valor_movimiento_empleado]);
            yield database_1.default.query('UPDATE EMPLEADO INNER JOIN CUENTA ON EMPLEADO.ID_CUENTA=CUENTA.ID_CUENTA set CUENTA.valor_cuenta=EMPLEADO.SUELDO_NETO WHERE CUENTA.ID_CUENTA=EMPLEADO.ID_CUENTA');
            yield database_1.default.query('UPDATE MOVIMIENTO_EMPLEADO AS M INNER JOIN CUENTA AS C ON M.ID_CUENTA=C.ID_CUENTA INNER JOIN EMPLEADO E ON M.ID_EMPLEADO=E.ID_EMPLEADO set C.valor_cuenta=(E.SUELDO-E.SUELDO_NETO) WHERE C.ID_CUENTA=M.ID_CUENTA');

            res.json({ message: 'movimiento_empleado IESS was updated' });
        });
    }
}
exports.movimiento_empleadoController = new Movimiento_empleadoController();