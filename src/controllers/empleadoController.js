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
exports.empleadoController = void 0;
const database_1 = __importDefault(require("../database"));

class EmpleadoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empleado = yield database_1.default.query('SELECT * FROM empleado');
            res.json(empleado);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empleado = yield database_1.default.query('SELECT * FROM empleado WHERE id_empleado = ?', [id]);
            if (empleado.length > 0) {
                return res.json(empleado[0]);
            }
            res.status(404).json({ text: "Empleado doesn't exists" });
        });
    }

    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const{nombre_empleado, apellido_empleado,cedula_empleado,correo, horas_laboradas,nombre_departamento,descripcion_cargo} = req.body;
            //obtener el departamento
            const departamento = yield database_1.default.query('SELECT * FROM DEPARTAMENTO WHERE id_departamento=?',[nombre_departamento]);
            const stringDepartamento = JSON.parse(JSON.stringify(departamento))
            
            //cálculo del sueldo por las horas trabajadas 
            const sueldo = stringDepartamento[0].SUELDO_FIJO;
            //cálculo del sueldo neto
            const sueldoNeto = sueldo+ (stringDepartamento[0].SUELDO_HORAS*horas_laboradas)

            //crear un empleado
            //agregar un cargo y departamento al empleado
            const cargoEmpleado = yield database_1.default.query('SELECT * FROM CARGO_EMPLEADO WHERE DESCRIPCION_CARGO=?',[descripcion_cargo]);
            const stringCargoEmpleado = JSON.parse(JSON.stringify(cargoEmpleado))
            //agregar un banco
            const banco = yield database_1.default.query('SELECT * FROM banco WHERE nombre_banco="Banco Pichincha"');
            const stringBanco = JSON.parse(JSON.stringify(banco))

            const newEmpleado = {
                id_cargo_empleado:stringCargoEmpleado[0].ID_CARGO_EMPLEADO,
                id_banco:stringBanco[0].ID_BANCO,
                nombre_empleado,
                apellido_empleado,
                cedula_empleado,
                correo,
                horas_laboradas,
                sueldo:sueldo,
                sueldo_neto:sueldoNeto
            }
            yield database_1.default.query('INSERT INTO empleado set?', [newEmpleado]);

            res.json({ message: 'Empleado saved' });
        });
    }
    
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const{nombre_empleado, apellido_empleado,cedula_empleado,correo, horas_laboradas,nombre_departamento,descripcion_cargo} = req.body;
        //obtener el departamento
        const departamento = yield database_1.default.query('SELECT * FROM DEPARTAMENTO WHERE id_departamento=?',[nombre_departamento]);
        const stringDepartamento = JSON.parse(JSON.stringify(departamento))
        //cálculo del sueldo por las horas trabajadas 
        const sueldo = horas_laboradas*stringDepartamento[0].SUELDO_HORAS;
        //cálculo del sueldo neto
        const sueldoNeto = sueldo+ stringDepartamento[0].SUELDO_FIJO

        //crear un empleado
        //agregar un cargo y departamento al empleado
        const cargoEmpleado = yield database_1.default.query('SELECT * FROM CARGO_EMPLEADO WHERE DESCRIPCION_CARGO=?',[descripcion_cargo]);
        const stringCargoEmpleado = JSON.parse(JSON.stringify(cargoEmpleado))

        yield database_1.default.query("UPDATE empleado set id_cargo_empleado=?, nombre_empleado = ?, apellido_empleado = ?, cedula_empleado = ?, correo=?,horas_laboradas = ?,sueldo=?, sueldo_neto=?  WHERE id_empleado = ?", [stringCargoEmpleado[0].ID_CARGO_EMPLEADO,nombre_empleado, apellido_empleado, cedula_empleado, correo, horas_laboradas,sueldo,sueldoNeto, id]);
        res.json({ message: 'Empleado was updated' });
    });
}


    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM movimiento_empleado WHERE id_empleado = ?', [id]);
            yield database_1.default.query('DELETE FROM EMPLEADO WHERE ID_EMPLEADO = ?', [id]);
            //cuenta de beneficios sociales
            const beneficiosSociales = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Beneficios sociales"')
            const stringBeneficiosSociales = JSON.parse(JSON.stringify(beneficiosSociales))
            //cuenta de nomina
            const pagoNomina = yield database_1.default.query('SELECT * FROM CUENTA WHERE DESCRIPCION_CUENTA = "Pago de nómina"')
            const stringPagoNomina = JSON.parse(JSON.stringify(pagoNomina))
            
            //actualizar la cuenta de beneficios 
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) monto on monto.id_cuenta=c.id_cuenta FROM movimiento_empleado where id_parametro_iess=1 || id_parametro_iess=2) montoBeneficio ON c.id_cuenta = montoBeneficio.id_cuenta SET c.valor_cuenta = montoBeneficio.monto where c.ID_CUENTA=?',[stringBeneficiosSociales[0].ID_CUENTA]);
            //actualizar la cuenta de pagos de nómina
            yield database_1.default.query('UPDATE cuenta c INNER JOIN (SELECT id_cuenta, SUM(valor_movimiento_empleado) monto on monto.id_cuenta=c.id_cuenta FROM movimiento_empleado where id_cuenta=?) montoNomina ON c.id_cuenta = montoNomina.id_cuenta SET c.valor_cuenta = montoNomina.monto where c.ID_CUENTA=?',[stringPagoNomina[0].ID_CUENTA,stringPagoNomina[0].ID_CUENTA]);

            res.json({ message: 'Empleado was deleted' });
        });
    }
}
exports.empleadoController = new EmpleadoController();