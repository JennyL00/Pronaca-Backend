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
exports.tipo_lista_producController = void 0;
const database_1 = __importDefault(require("../database"));

class Tipo_Lista_ProducController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipo_lista = yield database_1.default.query('SELECT * FROM tipo_lista_produc');
            res.json(tipo_lista);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tipo_lista = yield database_1.default.query('SELECT * FROM tipo_lista_produc WHERE id_tipo_lista_produc = ?', [id]);
            if (tipo_lista.length > 0) {
                return res.json(tipo_lista[0]);
            }
            res.status(404).json({ text: "Tipo Lista Produc doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tipo_lista_produc set?', [req.body]);
            res.json({ message: 'Tipo Lista Produc saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tipo_lista_produc set ? WHERE id_tipo_lista_produc = ?', [req.body, id]);
            res.json({ message: 'Tipo Lista Produc was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tipo_lista_produc WHERE id_tipo_lista_produc = ?', [id]);
            res.json({ message: 'Tipo Lista Produc was deleted' });
        });
    }
}
exports.tipo_lista_producController = new Tipo_Lista_ProducController();