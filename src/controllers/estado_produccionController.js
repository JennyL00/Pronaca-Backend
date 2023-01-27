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
exports.estado_produccionController = void 0;
const database_1 = __importDefault(require("../database"));

class Estado_ProduccionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estado_produccion = yield database_1.default.query('SELECT * FROM estado_produccion');
            res.json(estado_produccion);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const estado_produccion = yield database_1.default.query('SELECT * FROM estado_produccion WHERE id_estado_produccion = ?', [id]);
            if (estado_produccion.length > 0) {
                return res.json(estado_produccion[0]);
            }
            res.status(404).json({ text: "Estado Produccion doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO estado_produccion set?', [req.body]);
            res.json({ message: 'Estado Produccion saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE estado_produccion set ? WHERE id_estado_produccion = ?', [req.body, id]);
            res.json({ message: 'Estado Produccion was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM estado_produccion WHERE id_estado_produccion = ?', [id]);
            res.json({ message: 'Estado Produccion was deleted' });
        });
    }
}
exports.estado_produccionController = new Estado_ProduccionController();