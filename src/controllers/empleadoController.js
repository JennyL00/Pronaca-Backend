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
                return res.json(empleado);
            }
            res.status(404).json({ text: "Empleado doesn't exists" });
        });
    }

    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const{nombre_empleado, apellido_empleado,cedula_empleado,horas_laboradas,nombre_departamento,descripcion_cargo} = req.body;
            
            //agregar un cargo y departamento al empleado
            const cargoEmpleado = yield database_1.default.query('SELECT * FROM CARGO_EMPLEADO WHERE DESCRIPCION_CARGO=?',descripcion_cargo);
            const stringCargoEmpleado = JSON.parse(JSON.stringify(cargoEmpleado))
            //agregar un movimiento IESS al empleado
            const movimiento = yield database_1.default.query('SELECT * FROM MOVIMIENTO_EMPLEADO WHERE DESCRIPCION_MOVIMIENTO_ENPLEADO="IESS"')
            const stringMovimientoEmpleado = JSON.parse(JSON.stringify(movimiento))
            //Calcular el valor de la cuenta
            const sueldoSinIESS = horas_laboradas*stringCargoEmpleado[0].SUELDO_HORAS_CARGO;
            const valorIESS = sueldoSinIESS*(stringMovimientoEmpleado[0].VALOR_MOVIMIENTO_EMPLEADO/100)
            const sueldoNeto = sueldoSinIESS - (valorIESS)

            //crear un empleado
            const newEmpleado = {
                id_cargo_empleado:stringCargoEmpleado[0].ID_CARGO_EMPLEADO,
                id_movimiento_empleado:stringMovimientoEmpleado[0].ID_MOVIMIENTO_EMPLEADO,
                nombre_empleado,
                apellido_empleado,
                cedula_empleado,
                horas_laboradas,
                sueldo:sueldoSinIESS,
                sueldo_neto:sueldoNeto
            }
            
            yield database_1.default.query('INSERT INTO empleado set?', newEmpleado);
            
            //Crear cuenta y asiento para pago de nómina
            //crear un asiento
            const fecha = new Date(Date.now());
            const newAsiento = {
                id_informe_financiero:1,
                fecha_asiento:fecha.toISOString(),
                debe:0.0,
                haber:0.0
            };  
            
            yield database_1.default.query('INSERT INTO ASIENTO SET?',newAsiento)            
            console.log(newAsiento)
            //crear una cuenta
            let lastAsiento = yield database_1.default.query('select * from asiento order by id_asiento desc limit 1')
            let stringAsiento = JSON.parse(JSON.stringify(lastAsiento))

            const lastEmpleado = yield database_1.default.query('select * from empleado order by id_empleado desc limit 1')
            const stringEmpleado = JSON.parse(JSON.stringify(lastEmpleado))            

            const newCuentaNomina = {
                cue_id_cuenta:7,
                id_asiento:stringAsiento[0].ID_ASIENTO,
                id_empleado:stringEmpleado[0].ID_EMPLEADO,
                descripcion_cuenta:descripcion_cargo,
                codigo_cuenta:"2.1.1.1.",
                valor_cuenta:sueldoNeto
            }
            
            yield database_1.default.query('INSERT INTO CUENTA SET?',newCuentaNomina)
            yield database_1.default.query('UPDATE ASIENTO SET HABER=? WHERE ID_ASIENTO=?',[sueldoNeto,stringAsiento[0].ID_ASIENTO])

            //Crear cuenta y asiento para Beneficio Social
            //crear un asiento
            yield database_1.default.query('INSERT INTO ASIENTO SET?',newAsiento)            
            
            //crear una cuenta
            lastAsiento = yield database_1.default.query('select * from asiento order by id_asiento desc limit 1')
            stringAsiento = JSON.parse(JSON.stringify(lastAsiento))

            const newCuentaBeneficio = {
                cue_id_cuenta:7,
                id_asiento:stringAsiento[0].ID_ASIENTO,
                id_empleado:stringEmpleado[0].ID_EMPLEADO,
                descripcion_cuenta:"IESS",
                codigo_cuenta:"2.1.1.2.",
                valor_cuenta:valorIESS
            }

            yield database_1.default.query('INSERT INTO CUENTA SET?',newCuentaBeneficio)
            yield database_1.default.query('UPDATE ASIENTO SET HABER=? WHERE ID_ASIENTO=?',[valorIESS,stringAsiento[0].ID_ASIENTO])

            res.json({ message: 'Empleado saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE empleado set ? WHERE id_empleado = ?', [req.body, id]);
            res.json({ message: 'Empleado was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM empleado WHERE id_empleado = ?', [id]);
            res.json({ message: 'Empleado was deleted' });
        });
    }
}
exports.empleadoController = new EmpleadoController();