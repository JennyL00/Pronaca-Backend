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
exports.itemController = void 0;
const database_1 = __importDefault(require("../database"));

class ItemController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield database_1.default.query('SELECT * FROM item');
            res.json(item);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield database_1.default.query('SELECT * FROM item WHERE id_item = ?', [id]);
            if (item.length > 0) {
                return res.json(item);
            }
            res.status(404).json({ text: "Item doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO item set?', [req.body]);
            res.json({ message: 'Item saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE item set ? WHERE id_item = ?', [req.body, id]);
            res.json({ message: 'Item was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM item WHERE id_item = ?', [id]);
            res.json({ message: 'Item was deleted' });
        });
    }
}
exports.itemController = new ItemController();