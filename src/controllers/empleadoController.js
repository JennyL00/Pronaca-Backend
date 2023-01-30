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
            //obtener el sueldo por horas de un departamento
            const departamento = yield database_1.default.query('SELECT * FROM DEPARTAMENTO WHERE id_departamento=?',[nombre_departamento]);
            const stringDepartamento = JSON.parse(JSON.stringify(departamento))
            //calculo del sueldo sin IESS
            const sueldoSinIESS = horas_laboradas*stringDepartamento[0].SUELDO_HORAS;
            
            //crear un empleado
            //crear una cuenta de págo de nómina
            const newCuentaNomina = {
                cue_id_cuenta:7,
                id_asiento:7,
                descripcion_cuenta:descripcion_cargo,
                codigo_cuenta:"2.1.1.1."
            }
            yield database_1.default.query('INSERT INTO CUENTA SET?',[newCuentaNomina])
            //agregar un cargo y departamento al empleado
            const cargoEmpleado = yield database_1.default.query('SELECT * FROM CARGO_EMPLEADO WHERE DESCRIPCION_CARGO=?',[descripcion_cargo]);
            const stringCargoEmpleado = JSON.parse(JSON.stringify(cargoEmpleado))
            //agregar cuenta al empleado
            let cuenta = yield database_1.default.query('select * from cuenta order by id_cuenta desc limit 1');
            let stringCuenta = JSON.parse(JSON.stringify(cuenta))

            const newEmpleado = {
                id_cargo_empleado:stringCargoEmpleado[0].ID_CARGO_EMPLEADO,
                id_cuenta:stringCuenta[0].ID_CUENTA,
                nombre_empleado,
                apellido_empleado,
                cedula_empleado,
                horas_laboradas,
                sueldo:sueldoSinIESS
            }
            yield database_1.default.query('INSERT INTO empleado set?', [newEmpleado]);

            //Movimiento y cuenta para el IESS
            //Crear cuenta para Beneficio Social
            const newCuentaBeneficio = {
                cue_id_cuenta:7,
                id_asiento:7,
                descripcion_cuenta:"IESS",
                codigo_cuenta:"2.1.1.2."
            }
            yield database_1.default.query('INSERT INTO CUENTA SET?',[newCuentaBeneficio])
            
            //crear un movimiento para IESS
            //ultimo empleado
            const lastEmpleado = yield database_1.default.query('select * from empleado order by id_empleado desc limit 1')
            const stringEmpleado = JSON.parse(JSON.stringify(lastEmpleado))   
            //última cuenta
            cuenta = yield database_1.default.query('select * from cuenta order by id_cuenta desc limit 1')
            stringCuenta = JSON.parse(JSON.stringify(cuenta))  
            
            const newMovimiento = {
                id_empleado:stringEmpleado[0].ID_EMPLEADO,
                id_cuenta:stringCuenta[0].ID_CUENTA,
                descripcion_movimiento_enpleado:"IESS",
                VALOR_MOVIMIENTO_EMPLEADO:9.5
            }
            
            yield database_1.default.query('INSERT INTO MOVIMIENTO_EMPLEADO SET?',[newMovimiento])
            
            const movimiento = yield database_1.default.query('select * from movimiento_empleado where id_empleado=?',[stringEmpleado[0].ID_EMPLEADO])
            const stringMovimiento = JSON.parse(JSON.stringify(movimiento)) 
            //calcular valorIESS y sueldo neto
            const valorIESS = sueldoSinIESS*(stringMovimiento[0].VALOR_MOVIMIENTO_EMPLEADO/100)
            const sueldoNeto = sueldoSinIESS - (valorIESS)

            //actualiza empleado
            yield database_1.default.query('UPDATE empleado set sueldo_neto= ? WHERE id_empleado = ?', [sueldoNeto,stringEmpleado[0].ID_EMPLEADO]);
            //actualización cuenta IESS
            yield database_1.default.query('UPDATE cuenta set valor_cuenta= ? WHERE id_cuenta = ?', [valorIESS,stringMovimiento[0].ID_CUENTA]);
            //actualizar cuenta pago de nómina
            yield database_1.default.query('UPDATE cuenta set valor_cuenta= ? WHERE id_cuenta = ?', [sueldoNeto,stringEmpleado[0].ID_CUENTA]);

            res.json({ message: 'Empleado saved' });
        });
    }
    
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        //const { nombre_empleado, apellido_empleado, cedula_empleado } = req.body;
        const{nombre_empleado, apellido_empleado,cedula_empleado,horas_laboradas} = req.body;
        yield database_1.default.query("UPDATE empleado set nombre_empleado = ?, apellido_empleado = ?, cedula_empleado = ?, horas_laboradas = ? WHERE id_empleado = ?", [nombre_empleado, apellido_empleado, cedula_empleado, horas_laboradas, id]);
        res.json({ message: 'Empleado was updated' });
    });
}


    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE M, C FROM MOVIMIENTO_EMPLEADO M JOIN CUENTA C ON C.ID_CUENTA=M.ID_CUENTA WHERE M.ID_EMPLEADO = ?', [id]);
            yield database_1.default.query('DELETE E, C FROM EMPLEADO E JOIN CUENTA C ON C.ID_CUENTA=E.ID_CUENTA WHERE E.ID_EMPLEADO = ?', [id]);
            res.json({ message: 'Empleado was deleted' });
        });
    }
}
exports.empleadoController = new EmpleadoController();