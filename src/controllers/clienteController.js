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
exports.clienteController = void 0;
const database_1 = __importDefault(require("../database"));

class ClienteController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = 
            "SELECT cliente.ID_CLIENTE, cliente.NOMBRE_CLIENTE,cliente.APELLIDO_CLIENTE,cliente.RUC_CEDULA,cliente.EMAIL_CLIENTE,cliente.ESTADO_CLIENTE,ubicacion.ZONA_UBICACION,ubicacion.SECTOR_UBICACION,cliente.NUMERO_UBICACION, cliente.TELEFONO_CLIENTE FROM cliente JOIN ubicacion ON ubicacion.ID_UBICACION=cliente.ID_UBICACION;"       
            const cliente = yield database_1.default.query(consulta);
            res.json(cliente);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = 
            "SELECT cliente.ID_CLIENTE, cliente.NOMBRE_CLIENTE,cliente.APELLIDO_CLIENTE,cliente.RUC_CEDULA,cliente.EMAIL_CLIENTE,cliente.ESTADO_CLIENTE,ubicacion.ID_UBICACION, ubicacion.ZONA_UBICACION,ubicacion.SECTOR_UBICACION,cliente.NUMERO_UBICACION, cliente.TELEFONO_CLIENTE FROM cliente JOIN ubicacion ON ubicacion.ID_UBICACION=cliente.ID_UBICACION WHERE ID_CLIENTE = ?;"
            const cliente = yield database_1.default.query(/*'SELECT * FROM cliente_potencial WHERE id_cliente_potencial = ?'*/consulta, [id]);
            if (cliente.length > 0) {
                return res.json(cliente[0]);
            }
            res.status(404).json({ text: "Cliente doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO cliente set?', [req.body]);
            res.json({ message: 'Cliente saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE cliente_potencial set ? WHERE id_cliente_potencial = ?', [req.body, id]);
            res.json({ message: 'Cliente was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM cliente_potencial WHERE id_cliente_potencial = ?', [id]);
            res.json({ message: 'Cliente was deleted' });
        });
    }
}
exports.clienteController = new ClienteController();