//alamacenerar un enlace, guardarlos
const express = require('express');
const router = express.Router();

//conexión a la bd
const pool = require('../database');

router.get('/empleado/registrarEmpleado',(req,res)=>{
    res.send('Formulario')
})

router.post('/empleado/registrarEmpleado', async(req,res)=>{
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
   
    await pool.query('INSERT INTO empleado set ?', [newEmpleado])
    await pool.query('INSERT INTO cargo_empleado set ?', [newCargoEmpleado])
    const lastCargo = await pool.query('select id_cargo_empleado from cargo_empleado order by id_cargo_empleado desc limit 1')
    const lastEmpleado = await pool.query('select id_empleado from empleado order by id_empleado desc limit 1')

    pool.query('UPDATE empleado set id_cargo_empleado= ? WHERE ID_empleado = ?',[lastCargo,lastEmpleado])
    res.send('received')
    
})

router.get('empleado/registrarEmpleado/:id'),async(req,res)=>{
    res.send('formulario cargo')
}

router.get('/empleado/listaEmpleados',async(req,res)=>{
    const empleados = await pool.query('SELECT * FROM EMPLEADO')
    res.send(empleados)
})

router.get('/empleado/listaEmpleados/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const idMov = await pool.query('select id_movimieNto_empleado from empleado where id_empleado=?',[id])
    await pool.query('DELETE FROM MOVIMIENTO_EMPLEADO where id_MOVIMIENTO_empleado=?',[idMov])
    await pool.query('DELETE FROM CARGO_EMPLEADO WHERE ID_cargo_empleado=?',[id])
    await pool.query('DELETE FROM EMPLEADO WHERE ID_empleado=?',[id])
    

    res.send('eliminado')
})

router.get('/empleado/listaEmpleados/actualizar/:id',async(req,res)=>{
    const {id} = req.params;
    const empleado = await pool.query('SELECT * FROM EMPLEADO WHERE ID=?',[id]);
    res.render('empleado/listaEmpleados/actualizar',{empleado: empleado[0]})
})

router.get('/empleado/listaEmpleados/',async(req,res)=>{
    const {IESS} = req.body
    const newMovimiento = {
        descripcion_movimiento_enpleado: 'IESS',
        valor_movimiento_empleado
    }
    await pool.query('INSERT INTO MOVIMIENTO_EMPLEADO set ?', [newMovimiento])

    const lastMovimiento = await pool.query('SELECT ID_MOVIMIENTO_EMPLEADO FROM MOVIMIENTO_EMPLEADO ORDER BY ID_MOVIMIENTO_EMPLEADO DESC LIMIT 1')

    pool.query('UPDATE EMPLEADO SET ID_MOVIMIENTO_EMPLEADO= ?',[lastMovimiento])


})

module.exports = router;