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
exports.bodegaController = void 0;
const database_1 = __importDefault(require("../database"));

class BodegaController{
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodega = yield database_1.default.query('SELECT * FROM bodega');
            res.json(bodega);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bodega = yield database_1.default.query('SELECT * FROM bodega WHERE id_bodega = ?', [id]);
            if (bodega.length > 0) {
                return res.json(bodega[0]);
            }
            res.status(404).json({ text: "Bodega no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO bodega set?', [req.body]);
            res.json({ message: 'Bodega guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const {cantidad, id_item, id_cliente} = req.body;
            var consulta = "";
            console.log(req.body)
            const valor = req.body;
            const cliente = yield database_1.default.query('SELECT ID_UBICACION FROM CLIENTE WHERE ID_CLIENTE = ?',[valor[1].id_cliente]);
            const stringCliente = JSON.parse(JSON.stringify(cliente));
            const ubicacion = yield database_1.default.query('SELECT ZONA_UBICACION FROM UBICACION WHERE ID_UBICACION = ?',[stringCliente[0].ID_UBICACION]);
            const stringUbicacion = JSON.parse(JSON.stringify(ubicacion));
            const bodega = yield database_1.default.query('SELECT ID_BODEGA FROM BODEGA WHERE SECTOR_UBICACION = ?',[stringUbicacion[0].ZONA_UBICACION]);
            const stringBodega = JSON.parse(JSON.stringify(bodega));
            valor[0].map((item) => {
                //consulta += ('UPDATE bodegaitem SET CANTIDAD=CANTIDAD-'+item.cantidad_pedido+' WHERE bodegaitem.ID_ITEM='+item.id_item+' AND bodegaitem.ID_BODEGA='+stringBodega[0].ID_BODEGA+';');
                database_1.default.query('UPDATE bodegaitem SET CANTIDAD=CANTIDAD-? WHERE bodegaitem.ID_ITEM=? AND bodegaitem.ID_BODEGA=?', [item.cantidad_pedido, item.id_item, stringBodega[0].ID_BODEGA]);
            })
            //yield database_1.default.query('UPDATE bodegaitem SET CANTIDAD=CANTIDAD-? WHERE bodegaitem.ID_ITEM=? AND bodegaitem.ID_BODEGA=?', [valor[0].map(item => [item.cantidad_pedido, item.id_item, stringBodega[0].ID_BODEGA])]);
            //const resultado =yield database_1.default.query(consulta);
            res.json({ message: 'Bodega fue actualizada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM bodega WHERE id_bodega = ?', [id]);
            res.json({ message: 'Bodega fue borrada' });
        });
    }

    getQuantity(req, res){
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bodega = yield database_1.default.query(`SELECT bodega.NOMBRE, bodega.SECTOR_UBICACION ,item.NOMBRE_ITEM, bodegaitem.CANTIDAD FROM bodega INNER JOIN bodegaitem ON bodegaitem.ID_BODEGA = bodega.ID_BODEGA
                                                                INNER JOIN item ON bodegaitem.ID_ITEM = item.ID_ITEM where bodegaitem.ID_BODEGA = ?`,[id]);
            if (bodega.length > 0) {
                return res.json(bodega);
            }
            res.status(404).json({ text: "Bodega no existe" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bodega = yield database_1.default.query('SELECT * FROM bodega WHERE id_bodega = ?', [id]);
            if (bodega.length > 0) {
                return res.json(bodega[0]);
            }
            res.status(404).json({ text: "Bodega no existe" });
        });
    }
}
exports.bodegaController = new BodegaController();