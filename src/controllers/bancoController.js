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
exports.bancoController = void 0;
const database_1 = __importDefault(require("../database"));

class BancoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bancos = yield database_1.default.query('SELECT * FROM banco');
            res.json(bancos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bancos = yield database_1.default.query('SELECT * FROM banco WHERE id_banco = ?', [id]);
            if (bancos.length > 0) {
                return res.json(bancos[0]);
            }
            res.status(404).json({ text: "Bancos doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {nombre_banco, saldo} = req.body
            const cuentaBanco = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = ?',[nombre_banco])
            const stringCuentaBanco = JSON.parse(JSON.stringify(cuentaBanco))
            
            const newBanco = {
                id_cuenta:stringCuentaBanco[0].ID_CUENTA,
                nombre_banco,
                saldo
            }
            yield database_1.default.query('INSERT INTO banco set?', [newBanco]);
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA=? WHERE ID_CUENTA=?', [saldo,stringCuentaBanco[0].ID_CUENTA])
            res.json({ message: 'Banco saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const {nombre_banco, saldo} = req.body
            //cuenta del banco
            const cuentaBanco = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = ?',[nombre_banco])
            const stringCuentaBanco = JSON.parse(JSON.stringify(cuentaBanco))
            
            yield database_1.default.query('UPDATE banco set ? WHERE id_banco = ?', [req.body, id]);
            yield database_1.default.query('UPDATE CUENTA SET VALOR_CUENTA=? WHERE ID_CUENTA=?', [saldo,stringCuentaBanco[0].ID_CUENTA])
            res.json({ message: 'Banco was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM banco WHERE id_banco = ?', [id]);
            res.json({ message: 'Banco was deleted' });
        });
    }
}
exports.bancoController = new BancoController();