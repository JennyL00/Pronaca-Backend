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
            
            //cuenta de beneficios sociales
            const beneficiosSociales = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Beneficios sociales"')
            const stringBeneficiosSociales = JSON.parse(JSON.stringify(beneficiosSociales))
            //cuenta de pago de nómina
            const pagoNomina = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Pago de nómina"')
            const stringPagoNomina = JSON.parse(JSON.stringify(pagoNomina))
            //parámetros
            const parametrosIess = yield database_1.default.query('Select * from parametro_iess')
            const stringParametrosIess= JSON.parse(JSON.stringify(parametrosIess))
            //monto para el movimiento
            let montoMov = yield database_1.default.query('SELECT SUM(SUELDO*?) as monto FROM EMPLEADO',[stringParametrosIess[0].VALOR/100])
            let stringMontoMov = JSON.parse(JSON.stringify(montoMov))
            yield database_1.default.query('UPDATE movimiento_empleado m set m.valor_movimiento_empleado=? where m.id_parametro_iess=?', [stringMontoMov[0].monto , stringParametrosIess[0].ID_PARAMETRO_IESS]);
            montoMov = yield database_1.default.query('SELECT SUM(SUELDO*?) as monto FROM EMPLEADO',[stringParametrosIess[1].VALOR/100])
            stringMontoMov = JSON.parse(JSON.stringify(montoMov))
            yield database_1.default.query('UPDATE movimiento_empleado m set m.valor_movimiento_empleado=? where m.id_parametro_iess=?', [stringMontoMov[0].monto , stringParametrosIess[1].ID_PARAMETRO_IESS]);
            montoMov = yield database_1.default.query('SELECT id_movimiento_empleado, SUM(SUELDO_NETO) as monto FROM EMPLEADO')
            stringMontoMov = JSON.parse(JSON.stringify(montoMov))
            yield database_1.default.query('UPDATE movimiento_empleado m set m.valor_movimiento_empleado=? where m.id_cuenta=?', [stringMontoMov[0].monto,stringPagoNomina[0].ID_CUENTA]);
            //actualizar la cuenta de beneficios 
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) as monto FROM movimiento_empleado where descripcion_movimiento_enpleado=? || descripcion_movimiento_enpleado=?) montoBeneficio ON c.id_cuenta = montoBeneficio.id_cuenta SET c.valor_cuenta = montoBeneficio.monto where c.ID_CUENTA=?',[stringParametrosIess[0].NOMBRE_PARAMETRO,stringParametrosIess[1].NOMBRE_PARAMETRO,stringBeneficiosSociales[0].ID_CUENTA]);
            //actualizar la cuenta de pagos de nómina
            yield database_1.default.query('UPDATE cuenta c INNER JOIN movimiento_empleado m on c.id_cuenta = m.id_cuenta SET c.valor_cuenta = m.valor_movimiento_empleado where m.ID_CUENTA=?',[stringPagoNomina[0].ID_CUENTA]);

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
    
}
exports.movimiento_empleadoController = new Movimiento_empleadoController();