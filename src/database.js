const mysql = require('mysql')
const {promisify}=require('util');

const {database}=require('./keys');

const pool = mysql.createPool(database)

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOSE'){
            console.error('DATABASE CONNECTION WAS CLOSE');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

//cada vez que accedo a la bd puedo usar promesas y ya no callbacks
pool.query = promisify(pool.query)

module.exports = pool;