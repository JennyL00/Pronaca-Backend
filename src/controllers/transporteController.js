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
exports.transporteController = void 0;
const database_1 = __importDefault(require("../database"));

class TransporteController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporte = yield database_1.default.query('SELECT * FROM transporte;');
            res.json(transporte);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = 
            "SELECT * FROM transporte WHERE ID_TRANSPORTE = ?;"
            const transporte = yield database_1.default.query(consulta, [id]);
            if (transporte.length > 0) {
                return res.json(transporte[0]);
            }
            res.status(404).json({ text: "transporte doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO transporte set?', [req.body]);
            res.json({ message: 'transporte saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE transporte set ? WHERE id_transporte = ?', [req.body, id]);
            res.json({ message: 'transporte was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM transporte WHERE id_transporte = ?', [id]);
            res.json({ message: 'transporte was deleted' });
        });
    }
}
exports.transporteController = new TransporteController();