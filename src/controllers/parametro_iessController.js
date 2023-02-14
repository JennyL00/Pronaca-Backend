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
exports.parametro_iessController = void 0;
const database_1 = __importDefault(require("../database"));

class Parametro_IessController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = yield database_1.default.query('SELECT * FROM parametro_iess');
            res.json(parametros);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const parametros = yield database_1.default.query('SELECT * FROM parametro_iess WHERE id_parametro_iess = ?', [id]);
            if (parametros.length > 0) {
                return res.json(parametros[0]);
            }
            res.status(404).json({ text: "Parámetro doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO parametro_iess set?', [req.body]);
 
            res.json({ message: 'Parámetro saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE parametro_iess set ? WHERE id_parametro_iess = ?', [req.body, id]);
            res.json({ message: 'Parámetro was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM parametro_iess WHERE id_parametro_iess = ?', [id]);
            res.json({ message: 'Parámetro was deleted' });
        });
    }
}
exports.parametro_iessController = new Parametro_IessController();