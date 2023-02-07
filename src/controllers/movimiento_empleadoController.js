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
exports.movimiento_empleadoController = void 0;
const database_1 = __importDefault(require("../database"));

class Movimiento_empleadoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield database_1.default.query('SELECT * FROM movimiento_empleado');
            res.json(item);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const movimiento = yield database_1.default.query('SELECT * FROM movimiento_empleado WHERE id_movimiento_empleado = ?', [id]);
            if (movimiento.length > 0) {
                return res.json(movimiento);
            }
            res.status(404).json({ text: "Movimiento empleado doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {nombre_parametro, valor} = req.body
            //cuenta de beneficios sociales
            const beneficiosSociales = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Beneficios sociales"')
            const stringBeneficiosSociales = JSON.parse(JSON.stringify(beneficiosSociales))
            //parámetros
            const parametrosIess = yield database_1.default.query('Select * from parametro_iess order by id_parametro_iess desc limit 1')
            const stringParametrosIess= JSON.parse(JSON.stringify(parametrosIess))
            //crear movimientos para los parámetros iess
            const newMov ={
                id_cuenta: stringBeneficiosSociales[0].ID_CUENTA,
                id_parametro_iess: stringParametrosIess[0].ID_PARAMETRO_IESS,
                descripcion_movimiento_enpleado: nombre_parametro,
                valor_movimiento_empleado:0.0 
            };
            yield database_1.default.query('INSERT INTO movimiento_empleado set?',newMov)

            //verificar si existe un movimiento para el pago de nómina
            //cuenta de beneficios sociales
            const pagoNomina = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Pago de nómina"')
            const stringPagoNomina = JSON.parse(JSON.stringify(pagoNomina))
            //Movimientos existentes
            const movimientos = yield database_1.default.query('SELECT * FROM MOVIMIENTO_EMPLEADO')
            const stringMovimientos= JSON.parse(JSON.stringify(movimientos))
            
            const movimientoPagoNomina = stringMovimientos.filter(movimiento => movimiento.DESCRIPCION_MOVIMIENTO_ENPLEADO==stringPagoNomina[0].DESCRIPCION_CUENTA) 

            if(movimientoPagoNomina.length==0){
                //crear movimiento para el sueldo
                const newMovPagoNomina ={
                    id_cuenta: stringPagoNomina[0].ID_CUENTA,
                    descripcion_movimiento_enpleado: stringPagoNomina[0].DESCRIPCION_CUENTA,
                    valor_movimiento_empleado:0.0 
                };
                yield database_1.default.query('INSERT INTO movimiento_empleado set?',newMovPagoNomina)
            }
            
            res.json({ message: 'movimiento_empleado saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //empleado
            const empleado = yield database_1.default.query('select * from empleado where id_empleado=?',[id])
            const stringEmpleado = JSON.parse(JSON.stringify(empleado))
            //cuenta de beneficios sociales
            const beneficiosSociales = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Beneficios sociales"')
            const stringBeneficiosSociales = JSON.parse(JSON.stringify(beneficiosSociales))
            //cuenta de pago de nómina
            const pagoNomina = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Pago de nómina"')
            const stringPagoNomina = JSON.parse(JSON.stringify(pagoNomina))
            //parámetros
            const parametrosIess = yield database_1.default.query('Select * from parametro_iess')
            const stringParametrosIess= JSON.parse(JSON.stringify(parametrosIess))
            
            //actualizar los valores de los movimientos
            yield database_1.default.query('UPDATE movimiento_empleado set valor_movimiento_empleado=? WHERE id_empleado = ? and id_parametro_iess=?', [(stringParametrosIess[0].VALOR/100)*stringEmpleado[0].SUELDO_NETO , id, stringParametrosIess[0].ID_PARAMETRO_IESS]);
            yield database_1.default.query('UPDATE movimiento_empleado set valor_movimiento_empleado=? WHERE id_empleado = ? and id_parametro_iess=?', [(stringParametrosIess[1].VALOR/100)*stringEmpleado[0].SUELDO_NETO , id, stringParametrosIess[1].ID_PARAMETRO_IESS]);
            yield database_1.default.query('UPDATE movimiento_empleado set valor_movimiento_empleado=? WHERE id_empleado = ? and id_cuenta=?', [stringEmpleado[0].SUELDO_NETO-(stringParametrosIess[1].VALOR/100)*stringEmpleado[0].SUELDO_NETO -(stringParametrosIess[0].VALOR/100)*stringEmpleado[0].SUELDO_NETO ,id,stringPagoNomina[0].ID_CUENTA]);

            //actualizar la cuenta de beneficios 
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) monto FROM movimiento_empleado where id_parametro_iess=1 || id_parametro_iess=2) montoBeneficio ON c.id_cuenta = montoBeneficio.id_cuenta SET c.valor_cuenta = montoBeneficio.monto where c.ID_CUENTA=?',[stringBeneficiosSociales[0].ID_CUENTA]);
            //actualizar la cuenta de pagos de nómina
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) monto FROM movimiento_empleado where id_cuenta=?) montoNomina ON c.id_cuenta = montoNomina.id_cuenta SET c.valor_cuenta = montoNomina.monto where c.ID_CUENTA=?',[stringPagoNomina[0].ID_CUENTA,stringPagoNomina[0].ID_CUENTA]);

            res.json({ message: 'movimiento_empleado was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM movimiento_empleado WHERE id_empleado = ?', [id]);
            res.json({ message: 'movimiento_empleado was deleted' });
        });
    }
    updateMovimientos(req, res){
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = yield database_1.default.query('SELECT * FROM PARAMETRO_IESS')
            const stringParametros = JSON.parse(JSON.stringify(parametros))
            //actualizar la cuenta de beneficios 
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) monto FROM movimiento_empleado where id_parametro_iess=1 || id_parametro_iess=2) montoBeneficio ON c.id_cuenta = montoBeneficio.id_cuenta SET c.valor_cuenta = montoBeneficio.monto where c.ID_CUENTA=?',[stringBeneficiosSociales[0].ID_CUENTA]);
            //actualizar la cuenta de pagos de nómina
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) monto FROM movimiento_empleado where id_cuenta=?) montoNomina ON c.id_cuenta = montoNomina.id_cuenta SET c.valor_cuenta = montoNomina.monto where c.ID_CUENTA=?',[stringPagoNomina[0].ID_CUENTA,stringPagoNomina[0].ID_CUENTA]);

            res.json({ message: 'movimiento_empleado IESS was updated' });
        });
    }
    updateIess(req, res){
        return __awaiter(this, void 0, void 0, function* () {
            const {valor_movimiento_empleado} = req.body;
            yield database_1.default.query('UPDATE EMPLEADO SET SUELDO_NETO=SUELDO-(SUELDO*(?/100))',[valor_movimiento_empleado])
            
            yield database_1.default.query('UPDATE movimiento_empleado set valor_movimiento_empleado=? WHERE descripcion_movimiento_enpleado ="IESS"', [valor_movimiento_empleado]);
            yield database_1.default.query('UPDATE EMPLEADO INNER JOIN CUENTA ON EMPLEADO.ID_CUENTA=CUENTA.ID_CUENTA set CUENTA.valor_cuenta=EMPLEADO.SUELDO_NETO WHERE CUENTA.ID_CUENTA=EMPLEADO.ID_CUENTA');
            yield database_1.default.query('UPDATE MOVIMIENTO_EMPLEADO AS M INNER JOIN CUENTA AS C ON M.ID_CUENTA=C.ID_CUENTA INNER JOIN EMPLEADO E ON M.ID_EMPLEADO=E.ID_EMPLEADO set C.valor_cuenta=(E.SUELDO-E.SUELDO_NETO) WHERE C.ID_CUENTA=M.ID_CUENTA');

            res.json({ message: 'movimiento_empleado IESS was updated' });
        });
    }
}
exports.movimiento_empleadoController = new Movimiento_empleadoController();