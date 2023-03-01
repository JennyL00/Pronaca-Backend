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
            const c = yield database_1.default.query('SELECT distinct c2.descripcion_cuenta AS DESCRIPCION_CUENTA, c2.codigo_cuenta AS CODIGO_CUENTA, c2.id_cuenta AS ID_CUENTA FROM Cuenta as c1 LEFT JOIN Cuenta AS c2 ON (c2.cue_id_cuenta = c1.id_cuenta OR c1.id_cuenta = c2.id_cuenta ) ORDER BY c1.cue_id_cuenta ASC, c1.id_cuenta ASC, c2.id_cuenta ASC, c2.cue_id_cuenta ASC')
           
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
            yield database_1.default.query('INSERT INTO CUENTA SET ?', [req.body]);
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

}
exports.cuentaController = new CuentaController();