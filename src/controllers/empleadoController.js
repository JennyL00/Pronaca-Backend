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
            const{nombre_empleado, apellido_empleado,cedula_empleado,correo, horas_laboradas,sueldo_fijo,sueldo_horas,nombre_departamento,descripcion_cargo} = req.body;
            //obtener el movimiento de pago de nómina
            const movimientoNomina = yield database_1.default.query('SELECT * FROM MOVIMIENTO_EMPLEADO WHERE DESCRIPCION_MOVIMIENTO_ENPLEADO="Nómina por pagar"');
            const stringMovimientoNomina = JSON.parse(JSON.stringify(movimientoNomina))
            
            //obtener los parámetros del iess
            const parametros = yield database_1.default.query('SELECT * FROM PARAMETRO_IESS')
            const stringParametros = JSON.parse(JSON.stringify(parametros))
            //cálculo del sueldo por las horas trabajadas + el sueldo fijo 
            const sueldo = (horas_laboradas*sueldo_horas)+parseInt(sueldo_fijo);
            //cálculo del sueldo neto sin Parámetros del IESS
            const sueldoNeto = sueldo-((stringParametros[0].VALOR/100)*sueldo)-((stringParametros[1].VALOR/100)*sueldo)

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
                ID_MOVIMIENTO_EMPLEADO: stringMovimientoNomina[0].ID_MOVIMIENTO_EMPLEADO,
                nombre_empleado,
                apellido_empleado,
                cedula_empleado,
                correo,
                horas_laboradas,
                sueldo_fijo,
                sueldo_horas,
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
        const{nombre_empleado, apellido_empleado,cedula_empleado,correo, horas_laboradas,sueldo_fijo,sueldo_horas,nombre_departamento,descripcion_cargo} = req.body;
        //obtener los parámetros del iess
        const parametros = yield database_1.default.query('SELECT * FROM PARAMETRO_IESS')
        const stringParametros = JSON.parse(JSON.stringify(parametros))
        //cálculo del sueldo por las horas trabajadas + el sueldo fijo 
        const sueldo = (horas_laboradas*sueldo_horas)+parseInt(sueldo_fijo);
        //cálculo del sueldo neto sin Parámetros del IESS
        const sueldoNeto = sueldo-((stringParametros[0].VALOR/100)*sueldo)-((stringParametros[1].VALOR/100)*sueldo)

        //crear un empleado
        //agregar un cargo y departamento al empleado
        const cargoEmpleado = yield database_1.default.query('SELECT * FROM CARGO_EMPLEADO WHERE DESCRIPCION_CARGO=?',[descripcion_cargo]);
        const stringCargoEmpleado = JSON.parse(JSON.stringify(cargoEmpleado))

        yield database_1.default.query("UPDATE empleado set id_cargo_empleado=?, nombre_empleado = ?, apellido_empleado = ?, cedula_empleado = ?, correo=?,horas_laboradas = ?,sueldo_fijo=?, sueldo_horas=?, sueldo=?,sueldo_neto=?  WHERE id_empleado = ?", [stringCargoEmpleado[0].ID_CARGO_EMPLEADO,nombre_empleado, apellido_empleado, cedula_empleado, correo, horas_laboradas,sueldo_fijo,sueldo_horas,sueldo,sueldoNeto, id]);
        res.json({ message: 'Empleado was updated' });
    });
}


    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM EMPLEADO WHERE ID_EMPLEADO = ?', [id]);
            res.json({ message: 'Empleado was deleted' });
        });
    }
}
exports.empleadoController = new EmpleadoController();