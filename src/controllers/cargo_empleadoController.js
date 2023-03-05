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
exports.cargo_empleadoController = void 0;
const database_1 = __importDefault(require("../database"));

class Cargo_EmpleadoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cargo_empleado = yield database_1.default.query('SELECT * FROM cargo_empleado');
            res.json(cargo_empleado);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cargo_empleado = yield database_1.default.query('SELECT * FROM cargo_empleado WHERE id_cargo_empleado = ?', [id]);
            if (cargo_empleado.length > 0) {
                return res.json(cargo_empleado[0]);
            }
            res.status(404).json({ text: "cargo empleado doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {id_departamento} = req.body;
            const{descripcion_cargo}=req.body
            const newCargo = {
                id_departamento,
                descripcion_cargo
            }
            console.log('waiteando')
            yield database_1.default.query('INSERT INTO cargo_empleado set?', [newCargo]);
            res.json({ message: 'Cargo empleado saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE cargo_empleado set ? WHERE id_cargo_empleado = ?', [req.body, id]);
            res.json({ message: 'Cargo empleado was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM cargo_empleado WHERE id_cargo_empleado = ?', [id]);
            res.json({ message: 'Cargo empleado was deleted' });
        });
    }
}
exports.cargo_empleadoController = new Cargo_EmpleadoController();