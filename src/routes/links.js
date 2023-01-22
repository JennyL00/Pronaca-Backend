//alamacenerar un enlace, guardarlos
const express = require('express');
const router = express.Router();

//conexión a la bd
const pool = require('../database');

//obtener el formulario para registrar al empleado
router.get('/empleado/registrarEmpleado',(req,res)=>{
    res.send('Formulario')
})

//enviar el formulario lleno del empleado
router.post('/empleado/registrarEmpleado', async(req,res)=>{
    //datos del formulario
    const{nombre_empleado, apellido_empleado,cedula_empleado,descripcion_cargo,sueldo_horas_cargo,codigo_cargo} = req.body;
    
    const newEmpleado = {
        nombre_empleado,
        apellido_empleado,
        cedula_empleado
    }
    const newCargoEmpleado = {
        descripcion_cargo,
        sueldo_horas_cargo,
        codigo_cargo
    }
    
    //inserta un empleado
    await pool.query('INSERT INTO empleado set ?', [newEmpleado])
    //inserta el cargo para el empleado en la tabla cargo_empleado
    await pool.query('INSERT INTO cargo_empleado set ?', [newCargoEmpleado])
    //obtiene el útlimo cargo_empleado registrado
    const lastCargo = await pool.query('select id_cargo_empleado from cargo_empleado order by id_cargo_empleado desc limit 1')
    //obtiene el útlimo empleado registrado
    const lastEmpleado = await pool.query('select id_empleado from empleado order by id_empleado desc limit 1')
    //actualiza la columna del id_cargo_empleado de la tabla empleado para asignarle un cargo al último empleado registrado
    await pool.query('UPDATE empleado set id_cargo_empleado= ? WHERE ID_empleado = ?',[lastCargo[0].id_cargo_empleado,lastEmpleado[0].id_empleado])
    //agrega como clave foranea el movimiento del IESS 
    pool.query('UPDATE EMPLEADO SET ID_MOVIMIENTO_EMPLEADO= 1')
    res.send('received')

    // CÓDIGO FERNANDO: tomar horas de empleado y multiplicar por el sueldo asignado por hora y guardar en columna sueldo neto del empleado

    // Creación cuenta de empleado 

    const newCuenta = { descripcion_cuenta, codigo_cuenta, valor_cuenta }


    // Actualizar información de la cuenta con los datos del empleado
    newCuenta.descripcion_cuenta = newCargoEmpleado.descripcion_cargo
    newCuenta.codigo_cuenta = newCargoEmpleado.codigo_cargo
    newCuenta.valor_cuenta = sueldoNeto; // Cambiar por la variable del sueldo de Fernando !!!!!!!!!

    // Insertar nueva cuenta con el ID de asiento, su descripcion, código y valor
    await pool.query('INSERT INTO CUENTA set ?', [newCuenta])

    
})

//Obtiene la lista de los empleados registrados
router.get('/empleado/listaEmpleados',async(req,res)=>{
    const empleados = await pool.query('SELECT * FROM EMPLEADO')
    res.send(empleados)
})

//Borra un empleado junto con su cargo_empleado y movimientoEmpleado (IESS)
router.get('/empleado/listaEmpleados/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const idMov = await pool.query('select id_movimieNto_empleado from empleado where id_empleado=?',[id])
    await pool.query('DELETE FROM MOVIMIENTO_EMPLEADO where id_MOVIMIENTO_empleado=?',[idMov])
    await pool.query('DELETE FROM CARGO_EMPLEADO WHERE ID_cargo_empleado=?',[id])
    await pool.query('DELETE FROM EMPLEADO WHERE ID_empleado=?',[id])
    

    res.send('eliminado')
})

//obtiene el formulario para actualizar el empleado
router.get('/empleado/listaEmpleados/actualizar/:id',async(req,res)=>{
    const {id} = req.params;
    const empleado = await pool.query('SELECT * FROM EMPLEADO WHERE ID_EMPLEADO=?',[id]);

    res.send(empleado)
    //cuando ya tenga esta interfaz
    //res.render('links/empleado/listaEmpleados/actualizar',{empleado: empleado[0]})
})

//Obtiene los nuevos datos del empleado
router.post('/empleado/listaEmpleados/actualizar/:id',async(req,res)=>{
    const {id} = req.params;
    const{nombre_empleado, apellido_empleado,cedula_empleado,descripcion_cargo,sueldo_horas_cargo,codigo_cargo} = req.body;
    
    const newEmpleado = {
        nombre_empleado,
        apellido_empleado,
        cedula_empleado
    }
    const newCargoEmpleado = {
        descripcion_cargo,
        sueldo_horas_cargo,
        codigo_cargo
    }
    
    await pool.query('UPDATE EMPLEADO SET ? WHERE ID_EMPLEADO=?',[newEmpleado,id]);
    await pool.query('UPDATE CARGO_EMPLEADO SET ? WHERE ID_CARGO_EMPLEADO=?',[newCargoEmpleado,id]);

    res.send('actualizar')
})

//muestra el formulario para ingresar el valor del IESS 
router.get('/empleado/listaEmpleados/IESS',async(req,res)=>{
    const iess = await pool.query('SELECT * FROM MOVIMIENTO_EMPLEADO WHERE ID_MOVIMIENTO_EMPLEADO=1');
    console.log(iess)
    res.send(iess)
    //cuando ya tenga esta interfaz
    //res.render('links/empleado/listaEmpleados/actualizar',{empleado: empleado[0]})
})

//Guarda el datos del IESS
router.post('/empleado/listaEmpleados/IESS',async(req,res)=>{
    const {valor_movimiento_empleado} = req.body
    const newMovimiento = {
        descripcion_movimiento_enpleado:"IESS",
        valor_movimiento_empleado
    }
    
    await pool.query('UPDATE MOVIMIENTO_EMPLEADO set VALOR_MOVIMIENTO_EMPLEADO=?', [newMovimiento])
    res.send('act')
})


module.exports = router;