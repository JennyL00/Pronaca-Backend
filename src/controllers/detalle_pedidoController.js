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
exports.detalle_pedidoController = void 0;
const database_1 = __importDefault(require("../database"));

class Detalle_PedidoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params
            const consulta =
            "SELECT * FROM detalle_pedido JOIN item ON detalle_pedido.ID_ITEM = item.ID_ITEM WHERE detalle_pedido.ID_PEDIDO = ?;"
            const detalle_pedido = yield database_1.default.query(consulta, [id]);
            res.json(detalle_pedido);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta =
            "SELECT * FROM detalle_pedido WHERE ID_DETALLE_PEDIDO = ?;"
            const detalle_pedido = yield database_1.default.query(consulta, [id]);
            if (detalle_pedido.length > 0) {
                return res.json(detalle_pedido[0]);
            }
            res.status(404).json({ text: "Detalle_Pedido doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO detalle_pedido (ID_PEDIDO, ID_ITEM, CANTIDAD_PEDIDO, SUBTOTAL_DETALLE_PEDIDO, PRECIO_DETALLE_PEDIDO) VALUES ?', [req.body.map( obj => [obj.id_pedido, obj.id_item, obj.cantidad_pedido, obj.subtotal_detalle_pedido, obj.precio_detalle_pedido])]);
            
            res.json({ message: 'Detalle Pedido saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE detalle_pedido set ? WHERE id_detalle_pedido = ?', [req.body, id]);
            res.json({ message: 'Detalle Pedido was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM detalle_pedido WHERE id_detalle_pedido = ?', [id]);
            res.json({ message: 'Detalle Pedido was deleted' });
        });
    }
}
exports.detalle_pedidoController = new Detalle_PedidoController();