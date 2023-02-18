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
exports.pasos__recetaController = void 0;
const database_1 = __importDefault(require("../database"));

class Pasos_RecetaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paso_receta = yield database_1.default.query('SELECT * FROM paso_receta');
            res.json(paso_receta);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const paso_receta = yield database_1.default.query('SELECT * FROM paso_receta WHERE id_paso_receta = ?', [id]);
            if (paso_receta.length > 0) {
                return res.json(paso_receta[0]);
            }
            res.status(404).json({ text: "Paso Receta doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO paso_receta set?', [req.body]);
            res.json({ message: 'paso_receta saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE paso_receta set ? WHERE id_paso_receta = ?', [req.body, id]);
            res.json({ message: 'Paso Receta was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM paso_receta WHERE id_paso_receta = ?', [id]);
            res.json({ message: 'Paso Receta was deleted' });
        });
    }
}
exports.pasos_recetaController = new Pasos_RecetaController();