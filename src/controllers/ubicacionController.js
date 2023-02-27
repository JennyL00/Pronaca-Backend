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
exports.ubicacionController = void 0;
const database_1 = __importDefault(require("../database"));

class UbicacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ubicacion = yield database_1.default.query('SELECT * FROM ubicacion');
            res.json(ubicacion);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ubicacion = yield database_1.default.query('SELECT * FROM ubicacion WHERE id_ubicacion = ?', [id]);
            if (ubicacion.length > 0) {
                return res.json(ubicacion[0]);
            }
            res.status(404).json({ text: "Ubicacion doesn't exists" });
        });
    }
    create(req, res) {
        console.log("REQ.BODY",req.body)
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO ubicacion (ID_UBICACION, ZONA_UBICACION, SECTOR_UBICACION) VALUES ?', [req.body.map( obj => [obj.ID_UBICACION, obj.ZONA_UBICACION, obj.SECTOR_UBICACION ])]);
            res.json({ message: 'Ubicacion saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE ubicacion set ? WHERE id_ubicacion = ?', [req.body, id]);
            res.json({ message: 'Ubicacion was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM ubicacion WHERE id_ubicacion = ?', [id]);
            res.json({ message: 'ubicacion was deleted' });
        });
    }
}
exports.ubicacionController = new UbicacionController();