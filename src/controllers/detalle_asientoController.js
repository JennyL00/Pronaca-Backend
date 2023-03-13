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
exports.asientoController = void 0;
const database_1 = __importDefault(require("../database"));

class Detalle_asientoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asiento = yield database_1.default.query('SELECT * FROM detalle_asiento');
            res.json(asiento);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detalle_asiento = yield database_1.default.query('SELECT * FROM detalle_asiento WHERE id_detalle_asiento = ?', [id]);
            if (detalle_asiento.length > 0) {
                return res.json(asiento);
            }
            res.status(404).json({ text: "Detalle Asiento doesn't exists" });
        });
    }
    getDetalleAsiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {id} = req.params;
            const detalle_asiento = yield database_1.default.query('SELECT * FROM detalle_asiento WHERE id_asiento = ?', [id]);
           
            res.json(detalle_asiento);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {cuenta,haber, debe}=req.body
            //cuenta
            const infCuenta = yield database_1.default.query('SELECT * FROM CUENTA WHERE id_cuenta=?',[cuenta])
            const stringinfCuenta = JSON.parse(JSON.stringify(infCuenta))
            //ultimo asiento
            const asiento = yield database_1.default.query('select * from asiento order by id_asiento desc limit 1')
            const stringAsiento = JSON.parse(JSON.stringify(asiento))
            
            const newDetalleAsiento ={
                id_asiento:stringAsiento[0].ID_ASIENTO,
                informe_financiero:stringinfCuenta[0].ID_INFORME_FINANCIERO,
                id_cuenta:stringinfCuenta[0].ID_CUENTA,
                codigo_cuenta:stringinfCuenta[0].CODIGO_CUENTA,
                cuenta: stringinfCuenta[0].DESCRIPCION_CUENTA,
                debe,
                haber
            }
            yield database_1.default.query('INSERT INTO detalle_asiento set?', [newDetalleAsiento]);
            res.json({ message: 'detalle_asiento saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE detalle_asiento set ? WHERE id_detalle_asiento = ?', [req.body, id]);
            res.json({ message: 'detalle_asiento was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM detalle_asiento WHERE id_detalle_asiento = ?', [id]);
            res.json({ message: 'detalle_asiento was deleted' });
        });
    }
    deleteDetalles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM detalle_asiento WHERE id_asiento = ?', [id]);
            res.json({ message: 'detalle_asiento was deleted' });
        });
    }

    cerrarCuentas(req, res){
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detallesAsiento = yield database_1.default.query('SELECT * FROM detalle_asiento WHERE id_asiento = ?',[id])
            const stringDetalleAsiento = JSON.parse(JSON.stringify(detallesAsiento))
            
            for(var i =0; i<stringDetalleAsiento.length; i++){
                yield database_1.default.query('UPDATE CUENTA set VALOR_CUENTA=(VALOR_CUENTA+?) WHERE id_cuenta=?', [stringDetalleAsiento[i].DEBE, stringDetalleAsiento[i].ID_CUENTA])
                yield database_1.default.query('UPDATE CUENTA set VALOR_CUENTA=(VALOR_CUENTA-?) WHERE ID_CUENTA = ?', [stringDetalleAsiento[i].HABER, stringDetalleAsiento[i].ID_CUENTA]);    
                if(stringDetalleAsiento[i].ID_CUENTA==7){
                    yield database_1.default.query('UPDATE BANCO set saldo=(saldo+?) WHERE id_cuenta=?', [stringDetalleAsiento[i].DEBE, stringDetalleAsiento[i].ID_CUENTA])
                    yield database_1.default.query('UPDATE BANCO set saldo=(saldo-?) WHERE id_cuenta=?', [stringDetalleAsiento[i].HABER, stringDetalleAsiento[i].ID_CUENTA])
                }else{
                    if(stringDetalleAsiento[i].ID_CUENTA==8){
                        yield database_1.default.query('UPDATE BANCO set saldo=(saldo+?) WHERE id_cuenta=?', [stringDetalleAsiento[i].DEBE, stringDetalleAsiento[i].ID_CUENTA])
                        yield database_1.default.query('UPDATE BANCO set saldo=(saldo-?) WHERE id_cuenta=?', [stringDetalleAsiento[i].HABER, stringDetalleAsiento[i].ID_CUENTA])
                    }
                }
            }
            res.json({ message: 'cuentas por cobrar were update' });
        });
    }
}
exports.detalle_asientoController = new Detalle_asientoController();