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
exports.preventaController = void 0;
const database_1 = __importDefault(require("../database"));

class PreventaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const preventa = yield database_1.default.query('SELECT * FROM preventa');
            res.json(preventa);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const preventa = yield database_1.default.query('SELECT * FROM preventa WHERE id_preventa = ?', [id]);
            if (cliente.length > 0) {
                return res.json(preventa[0]);
            }
            res.status(404).json({ text: "Preventa doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO preventa set?', [req.body]);
            res.json({ message: 'Preventa saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE preventa set ? WHERE id_preventa = ?', [req.body, id]);
            res.json({ message: 'Preventa was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM preventa WHERE id_preventa = ?', [id]);
            res.json({ message: 'Preventa was deleted' });
        });
    }
}
exports.preventaController = new PreventaController();