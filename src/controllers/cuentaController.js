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
    createCargoEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const{id} = req.params;
            //obtener el empleado a pagar
            const empleado = yield database_1.default.query('SELECT * FROM EMPLEADO WHERE ID_EMPLEADO=?',[id])
            const stringEmpleado = JSON.parse(JSON.stringify(empleado))
            
            //obtener el cargo del Empleado
            const cargo = yield database_1.default.query('SELECT * FROM CARGO_EMPLEADO WHERE ID_CARGO_EMPLEADO=?',[stringEmpleado[0].ID_CARGO_EMPLEADO])
            
            const stringCargo = JSON.parse(JSON.stringify(cargo))
            //obtener el departamento
            const departamento = yield database_1.default.query('SELECT * FROM DEPARTAMENTO WHERE ID_DEPARTAMENTO=?',[stringCargo[0].ID_DEPARTAMENTO])
            const stringDepartamento = JSON.parse(JSON.stringify(departamento))
            //asignar un codigo a la cuenta dependiendo del departamento
            let codigo_cuenta = ""
            let id_cuenta = 0
            if(stringDepartamento[0].NOMBRE_DEPARTAMENTO == "Personal Administrativo"){
                codigo_cuenta = "5.1.1."
                id_cuenta = 14
            }else{
                if(stringDepartamento[0].NOMBRE_DEPARTAMENTO == "Personal Comercial"){
                    codigo_cuenta = "5.2.1."
                    id_cuenta = 16
                }else{
                    if(stringDepartamento[0].NOMBRE_DEPARTAMENTO == "Personal Producción"){
                        codigo_cuenta = "5.2.2."
                        id_cuenta = 17
                    }
                }
            }

            const newCuenta = {
                CUE_ID_CUENTA:id_cuenta,
                ID_ASIENTO:id_cuenta,
                DESCRIPCION_CUENTA:stringCargo[0].DESCRIPCION_CARGO,
                CODIGO_CUENTA:codigo_cuenta,
                VALOR_CUENTA: stringEmpleado[0].SUELDO
            }
            yield database_1.default.query('INSERT INTO cuenta set?', [newCuenta]);
            //Actualizar horas laboradas del empleado
            yield database_1.default.query('UPDATE EMPLEADO SET HORAS_LABORADAS=160 WHERE ID_EMPLEADO = ?', [id]);
            
            
            res.json({ message: 'Cuenta Costos saved' });
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

    //calcular el total de los costos directos e indirectos
    cuentasCostos(req,res){
        return __awaiter(this, void 0, void 0, function*(){
            //Estado de resultados
            //Cálculo de costos directos
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=14) WHERE ID_CUENTA=14')
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=13) WHERE ID_CUENTA=13')
            //Cálculo de costos indirectos
            //Personal Comercial
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=16) WHERE ID_CUENTA=16')
            //Personal Producción
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=17) WHERE ID_CUENTA=17')
            //costos indirectos
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=15) WHERE ID_CUENTA=15')
            //Cálculo de costos
            yield database_1.default.query('UPDATE cuenta SET VALOR_CUENTA = (SELECT SUM(VALOR_CUENTA) AS MONTO_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA=12) WHERE ID_CUENTA=12')

            res.json({ message: 'cuentas costos actualizadas' });
        });
    }
}
exports.cuentaController = new CuentaController();