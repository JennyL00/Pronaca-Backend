//alamacenerar un enlace, guardarlos
const express = require('express');
const router = express.Router();

//conexión a la bd
const pool = require('../database');

router.get('/add',(req,res)=>{
    res.render('/links/add')
})

module.exports = router;