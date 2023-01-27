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
exports.departamentoController = void 0;
const database_1 = __importDefault(require("../database"));

class DepartamentoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const departamento = yield database_1.default.query('SELECT * FROM departamento');
            res.json(departamento);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const departamento = yield database_1.default.query('SELECT * FROM departamento WHERE id_departamento = ?', [id]);
            if (departamento.length > 0) {
                return res.json(departamento);
            }
            res.status(404).json({ text: "Departamento doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO departamento set?', [req.body]);
            res.json({ message: 'Departamento saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE departamento set ? WHERE id_departamento = ?', [req.body, id]);
            res.json({ message: 'Departamento was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM departamento WHERE id_departamento = ?', [id]);
            res.json({ message: 'Departamento was deleted' });
        });
    }
}
exports.departamentoController = new DepartamentoController();