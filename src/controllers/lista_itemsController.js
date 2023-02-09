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
exports.lista_itemsController = void 0;
const database_1 = __importDefault(require("../database"));

class Lista_ItemsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista_items = yield database_1.default.query('CALL LIST_ITEM_ALL()');
            res.json(lista_items[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const lista_items = yield database_1.default.query('SELECT * FROM lista_items WHERE id_lista_items = ?', [id]);
            if (lista_items.length > 0) {
                return res.json(lista_items[0]);
            }
            res.status(404).json({ text: "Lista Items doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO lista_items set?', [req.body]);
            res.json({ message: 'Lista Items Produccion saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE lista_items set ? WHERE id_lista_items = ?', [req.body, id]);
            res.json({ message: 'Lista Items was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM lista_items WHERE id_lista_items = ?', [id]);
            res.json({ message: 'Lista Items was deleted' });
        });
    }
}
exports.lista_itemsController = new Lista_ItemsController();