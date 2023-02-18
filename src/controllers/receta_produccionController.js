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
exports.receta_produccionController = void 0;
const database_1 = __importDefault(require("../database"));

class Receta_ProduccionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const receta = yield database_1.default.query('SELECT * FROM receta_produccion');
            res.json(receta);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const receta = yield database_1.default.query('SELECT * FROM receta_produccion WHERE id_receta_produccion = ?', [id]);
            if (receta.length > 0) {
                return res.json(receta[0]);
            }
            res.status(404).json({ text: "Receta de Produccion doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO receta_produccion set?', [req.body]);
            res.json({ message: 'Receta de Produccion saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE receta_produccion set ? WHERE id_receta_produccion = ?', [req.body, id]);
            res.json({ message: 'Receta de Produccion was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM receta_produccion WHERE id_receta_produccion = ?', [id]);
            res.json({ message: 'Receta de Produccion was deleted' });
        });
    }
}
exports.receta_produccionController = new Receta_ProduccionController();