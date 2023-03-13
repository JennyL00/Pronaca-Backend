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
exports.pedidoProveedorController = void 0;
const database_1 = __importDefault(require("../database"));

class PedidoProveedorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta =
            "SELECT * FROM PEDIDO_PROVEEDOR JOIN PROVEEDOR ON PROVEEDOR.ID_PROVEEDOR=PEDIDO_PROVEEDOR.ID_PROVEEDOR"
            const pedidoProveedor = yield database_1.default.query(consulta);
            res.json(pedidoProveedor);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta =
            "SELECT * FROM PEDIDO_PROVEEDOR JOIN PROVEEDOR ON PROVEEDOR.ID_PROVEEDOR=PEDIDO_PROVEEDOR.ID_PROVEEDOR WHERE ID_PEDIDO_PROVEEDOR = ?;"
            const pedidoProveedor = yield database_1.default.query(consulta, [id]);
            if (pedidoProveedor.length > 0) {
                return res.json(pedidoProveedor[0]);
            }
            res.status(404).json({ text: "Pedido doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const {id_cuenta,id_proveedor,FECHA_PEDIDO_PROVEEDOR,DETALLE_PEDIDO_PROVEEDOR, CANTIDAD_PEDIDO, SUBTOTAL_PEDIDO_PROVEEDOR, TOTAL_PEDIDO_PROVEEDOR} = req.body
            yield database_1.default.query('INSERT INTO pedido_proveedor set?', [req.body]);            
            res.json({ message: 'Pedido saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE pedido_proveedor set ? WHERE id_pedido_proveedor = ?', [req.body, id]);
            res.json({ message: 'Pedido was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM pedido_proveedor WHERE id_pedido_proveedor = ?', [id]);
            res.json({ message: 'Pedido was deleted' });
        });
    }
}
exports.pedidoProveedorController = new PedidoProveedorController();