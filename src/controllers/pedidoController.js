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
exports.pedidoController = void 0;
const database_1 = __importDefault(require("../database"));

class PedidoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta =
            "SELECT pedido.ID_PEDIDO, cliente.NOMBRE_CLIENTE, cliente.APELLIDO_CLIENTE, empleado.NOMBRE_EMPLEADO, empleado.APELLIDO_EMPLEADO, pedido.FECHA_PEDIDO, pedido.ESTADO_PEDIDO FROM pedido JOIN empleado ON empleado.ID_EMPLEADO=pedido.ID_EMPLEADO JOIN cliente ON cliente.ID_CLIENTE=pedido.ID_CLIENTE;"
            const pedido = yield database_1.default.query(consulta);
            res.json(pedido);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta =
            // "SELECT pedido.ID_PEDIDO, cliente.NOMBRE_CLIENTE, cliente.APELLIDO_CLIENTE, empleado.NOMBRE_EMPLEADO, empleado.APELLIDO_EMPLEADO, pedido.FECHA_PEDIDO, pedido.ESTADO_PEDIDO FROM pedido JOIN empleado ON empleado.ID_EMPLEADO=pedido.ID_EMPLEADO JOIN cliente ON cliente.ID_CLIENTE=pedido.ID_CLIENTE WHERE ID_PEDIDO = ?;"
            "SELECT * FROM pedido WHERE ID_PEDIDO = ?;"
            const pedido = yield database_1.default.query(consulta, [id]);
            if (pedido.length > 0) {
                return res.json(pedido[0]);
            }
            res.status(404).json({ text: "Pedido doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {id_cliente,id_empleado,FECHA_PEDIDO,ESTADO_PEDIDO} = req.body
            let newPedido = {
                id_cliente,
                id_empleado,
                FECHA_PEDIDO,
                ESTADO_PEDIDO
            }
            if(ESTADO_PEDIDO=="Entregado"){
                newPedido = {
                    id_cliente,
                    id_cuenta:46,
                    id_empleado,
                    FECHA_PEDIDO,
                    ESTADO_PEDIDO
                }
            }
            yield database_1.default.query('INSERT INTO pedido set?', [newPedido]);            
            res.json({ message: 'Pedido saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE pedido set ? WHERE id_pedido = ?', [req.body, id]);
            res.json({ message: 'Pedido was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM pedido WHERE id_pedido = ?', [id]);
            res.json({ message: 'Pedido was deleted' });
        });
    }
}
exports.pedidoController = new PedidoController();