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
exports.flotaController = void 0;
const database_1 = __importDefault(require("../database"));

class FlotaController {
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = 
            'SELECT * FROM flota JOIN transporte ON transporte.ID_TRANSPORTE=flota.ID_TRANSPORTE;'
            const flotas = yield database_1.default.query(consulta);
            res.json(flotas);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = 
            'SELECT * FROM flota JOIN transporte ON transporte.ID_TRANSPORTE=flota.ID_TRANSPORTE WHERE flota.ID_TRANSPORTE = ?;'
            const flotas = yield database_1.default.query(consulta, [id]);
            res.json(flotas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = 
            'SELECT * FROM flota JOIN transporte ON transporte.ID_TRANSPORTE=flota.ID_TRANSPORTE WHERE ID_FLOTA = ?;'
            const flota = yield database_1.default.query(consulta, [id]);
            if (flota.length > 0) {
                return res.json(flota[0]);
            }
            res.status(404).json({ text: "Flota doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO flota set?', [req.body]);
            res.json({ message: 'Flota saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE flota set ? WHERE id_flota = ?', [req.body, id]);
            res.json({ message: 'Flota was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM flota WHERE id_flota = ?', [id]);
            res.json({ message: 'Flota was deleted' });
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE flota SET CANTIDAD_PEDIDOS_FLOTA = CANTIDAD_PEDIDOS_FLOTA + 1 WHERE ID_FLOTA = ?;', [id]);
            res.json({ message: 'Flota was updated' });
        });
    }
    rest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE flota set CANTIDAD_PEDIDOS_FLOTA=CANTIDAD_PEDIDOS_FLOTA-1 WHERE id_flota = ?', [id]);
            res.json({ message: 'Flota was updated' });
        });
    }
}
exports.flotaController = new FlotaController();