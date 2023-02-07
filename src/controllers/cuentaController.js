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
exports.cuentaController = void 0;
const database_1 = __importDefault(require("../database"));

class CuentaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = yield database_1.default.query('SELECT * FROM cuenta');
            res.json(cuenta);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cuenta = yield database_1.default.query('SELECT * FROM cuenta WHERE id_cuenta = ?', [id]);
            if (cuenta.length > 0) {
                return res.json(cuenta);
            }
            res.status(404).json({ text: "Cuenta doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const {descripcion_cuenta, codigo_cuenta, informe_financiero, cue_id_cuenta} = req.body;
            const newCuenta = {
                cue_id_cuenta,
                descripcion_cuenta, 
                codigo_cuenta, 
                informe_financiero
            }
            yield database_1.default.query('INSERT INTO CUENTA SET ?', [req.body]);
            res.json({ message: 'Cuenta saved' });
        });
    }
    
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE cuenta set ? WHERE id_cuenta = ?', [req.body, id]);
            res.json({ message: 'Cuenta was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM cuenta WHERE id_cuenta = ?', [id]);
            res.json({ message: 'Cuenta was deleted' });
        });
    }
    //calcular  el total de las cuentas pasivos
    cuentasPasivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            //Balance General
            //cálculo de cuentas por pagar
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=7) WHERE ID_CUENTA=7')
            //cálculo de Pasivos corrientes
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=6) WHERE ID_CUENTA=6')
            //cálculo de pasivos
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=5) WHERE ID_CUENTA=5')

            res.json({ message: 'cuentas actualizadas' });
        });
    }

    //calcular el total de los costos y gastos
    cuentasCostosGastos(req,res){
        return __awaiter(this, void 0, void 0, function*(){
        const {id} = req.params;
        //cuenta costos operativos
        const cuentaCostosOperativos = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Costos operativos"')
        const stringCuentaCostosOperativos = JSON.parse(JSON.stringify(cuentaCostosOperativos))
        //cálculo costos operativos
        const costosOperativos = yield database_1.default.query('SELECT SUM(E.SUELDO_NETO) AS SUELDO FROM EMPLEADO E INNER JOIN CARGO_EMPLEADO C ON E.ID_CARGO_EMPLEADO=C.ID_CARGO_EMPLEADO INNER JOIN DEPARTAMENTO D ON C.ID_DEPARTAMENTO=D.ID_DEPARTAMENTO WHERE E.ID_CARGO_EMPLEADO=C.ID_CARGO_EMPLEADO AND C.ID_DEPARTAMENTO=D.ID_DEPARTAMENTO AND D.ID_CUENTA=?',[stringCuentaCostosOperativos[0].ID_CUENTA])
        const stringCostosOperativos = JSON.parse(JSON.stringify(costosOperativos))

        //cuenta gastos nómina
        const cuentaGastosNomina = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Gastos nómina"')
        const stringCuentaGastosNomina = JSON.parse(JSON.stringify(cuentaGastosNomina))
        //cálculo de gastos nómina
        const gastosNomina = yield database_1.default.query('SELECT SUM(E.SUELDO_NETO) AS SUELDO FROM EMPLEADO E INNER JOIN CARGO_EMPLEADO C ON E.ID_CARGO_EMPLEADO=C.ID_CARGO_EMPLEADO INNER JOIN DEPARTAMENTO D ON C.ID_DEPARTAMENTO=D.ID_DEPARTAMENTO WHERE E.ID_CARGO_EMPLEADO=C.ID_CARGO_EMPLEADO AND C.ID_DEPARTAMENTO=D.ID_DEPARTAMENTO AND D.ID_CUENTA=?',[stringCuentaGastosNomina[0].ID_CUENTA])
        const stringGastosOperativos = JSON.parse(JSON.stringify(gastosNomina))
        
        //cuenta de beneficios sociales
        const beneficiosSociales = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Beneficios sociales"')
        const stringBeneficiosSociales = JSON.parse(JSON.stringify(beneficiosSociales))
        //cuenta de nomina
        const pagoNomina = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Pago de nómina"')
        const stringPagoNomina = JSON.parse(JSON.stringify(pagoNomina))
 

        //actualizar cuenta costos operativos
        yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = ? WHERE ID_CUENTA=?',[stringCostosOperativos[0].SUELDO,stringCuentaCostosOperativos[0].ID_CUENTA])
        //actualizar cuenta gastos nómina
        yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = ? WHERE ID_CUENTA=?',[stringGastosOperativos[0].SUELDO,stringCuentaGastosNomina[0].ID_CUENTA])
        
        //actualizar datos del empleado
        yield database_1.default.query('UPDATE EMPLEADO SET HORAS_LABORADAS = 0 AND SUELDO_NETO=SUELDO')
        yield database_1.default.query('UPDATE EMPLEADO SET SUELDO_NETO = SUELDO')
        yield database_1.default.query('UPDATE EMPLEADO E INNER JOIN MOVIMIENTO_EMPLEADO M ON E.ID_EMPLEADO=M.ID_EMPLEADO INNER JOIN PARAMETRO_IESS P ON P.ID_PARAMETRO_IESS=M.ID_PARAMETRO_IESS SET M.VALOR_MOVIMIENTO_EMPLEADO=E.SUELDO_NETO*(P.VALOR/100) WHERE P.ID_PARAMETRO_IESS=1 AND M.ID_PARAMETRO_IESS=1')
        
        //Parámetro iess 1
        const parametroUno=yield database_1.default.query('SELECT * FROM PARAMETRO_IESS WHERE ID_PARAMETRO_IESS=1')
        const stringParametroUno = JSON.parse(JSON.stringify(parametroUno))
        //Parámetro iess 2
        const parametroDos=yield database_1.default.query('SELECT * FROM PARAMETRO_IESS WHERE ID_PARAMETRO_IESS=2')
        const stringParametroDos = JSON.parse(JSON.stringify(parametroDos))

        yield database_1.default.query('UPDATE EMPLEADO E INNER JOIN MOVIMIENTO_EMPLEADO M ON E.ID_EMPLEADO=M.ID_EMPLEADO SET M.VALOR_MOVIMIENTO_EMPLEADO=E.SUELDO_NETO-(E.SUELDO_NETO*?)-(E.SUELDO_NETO*?) WHERE M.ID_CUENTA=?',[stringParametroUno[0].VALOR/100,stringParametroDos[0].VALOR/100,stringCuentaGastosNomina[0].ID_CUENTA])
        
        //actualizar cuentas
        //actualizar la cuenta de beneficios 
        yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) as monto FROM movimiento_empleado where id_parametro_iess=1 || id_parametro_iess=2) montoBeneficio ON c.id_cuenta = montoBeneficio.id_cuenta SET c.valor_cuenta = montoBeneficio.monto where c.ID_CUENTA=?',[stringBeneficiosSociales[0].ID_CUENTA]);
        //actualizar la cuenta de pagos de nómina
        yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) as monto FROM movimiento_empleado where id_cuenta=?) montoNomina ON c.id_cuenta = montoNomina.id_cuenta SET c.valor_cuenta = montoNomina.monto where c.ID_CUENTA=?',[stringPagoNomina[0].ID_CUENTA,stringPagoNomina[0].ID_CUENTA]);
        //actualizar banco
        const sumaPagosNomina = yield database_1.default.query('SELECT SUM(valor_cuenta) as monto FROM cuenta where descripcion_cuenta="Costos operativos" || descripcion_cuenta="Gastos nómina"')
        const stringSumaPagosNomina = JSON.parse(JSON.stringify(sumaPagosNomina))
        yield database_1.default.query('UPDATE banco b set b.saldo=b.saldo-? where b.id_banco=?',[stringSumaPagosNomina[0].monto,id]);
        //actualizar cuenta del banco
        yield database_1.default.query('UPDATE cuenta c inner join banco b on c.id_cuenta=b.id_cuenta set c.valor_cuenta=b.saldo where c.id_cuenta=(select id_cuenta from banco where id_banco=?) and b.id_banco=?',[id,id]);


        /*yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=13) WHERE ID_CUENTA=13')
            //Cálculo de costos indirectos
            //Personal Comercial
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=16) WHERE ID_CUENTA=16')
            //Personal Producción
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=17) WHERE ID_CUENTA=17')
            //costos indirectos
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=15) WHERE ID_CUENTA=15')
            //Cálculo de costos
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=12) WHERE ID_CUENTA=12')
*/
            res.json({ message: 'cuentas costos actualizadas' });
        });
    }
}
exports.cuentaController = new CuentaController();