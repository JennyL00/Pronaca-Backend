const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const itemRoutes = require("./routes/itemRoutes");
const empleadoRoutes = require("./routes/empleadosRoutes");
const cargo_empleadoRoutes = require("./routes/cargo_empleadoRoutes");
const asientoRoutes = require("./routes/asientoRoute");
const cuentaRoutes = require("./routes/cuentaRoutes");
const departamentoRoutes = require("./routes/departamentoRoutes")
const movimiento_empleadoRoutes = require("./routes/movimiento_empleadoRoutes")
//const cuentasRoutes = require("./routes/informe_financieroRoutes");
const tipo_itemRoutes = require("./routes/tipo_itemRoutes");
const estado_produccionRoutes = require("./routes/estado_produccionRoutes");
const lista_itemsRoutes = require("./routes/lista_itemsRoutes");
const itemventaRoutes = require("./routes/itemventaRouter")
const clienteRoutes = require("./routes/clientesRoutes");
const pedidoRoutes = require("./routes/pedidosRoutes");
const detalle_pedidoRoutes = require("./routes/detalle_pedidosRoutes");
const preventaRoutes = require("./routes/preventasRoutes");
const ubicacionesRoutes = require("./routes/ubicacionesRoutes");
const receta_produccionRoutes = require("./routes/receta_produccionRoutes");
const tipo_lista_producRoutes = require("./routes/tipo_lista_producRoutes")
const parametro_iessRoutes = require("./routes/parametro_iessRoutes");
const bancoRoutes = require("./routes/bancoRoutes")

//initialization
const app = express();

// Inconveniente con CORS
app.use(function(req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');    
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');    next();
});

//settings de que puerto va a acceder
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));

//navegación
app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'), //layout está dentro de views
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')

}));
app.set('view engine', '.hbs');

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global variables
app.use((req,rest,next)=>{
    next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
//app.use('/links',require('./routes/links'));
app.use('/api/item', itemRoutes.default);
app.use('/api/empleado', empleadoRoutes.default);
app.use('/api/cargo_empleado', cargo_empleadoRoutes.default);
app.use('/api/asiento', asientoRoutes.default);
app.use('/api/cuenta', cuentaRoutes.default);
app.use('/api/departamento',departamentoRoutes.default)
app.use('/api/movimiento_empleado',movimiento_empleadoRoutes.default)
app.use('/api/tipo_item', tipo_itemRoutes.default);
app.use('/api/estado_produccion', estado_produccionRoutes.default);
app.use('/api/lista_items', lista_itemsRoutes.default);
app.use('/api/itemventa', itemventaRoutes.default);
app.use('/api/cliente',clienteRoutes.default);
app.use('/api/pedido',pedidoRoutes.default);
app.use('/api/detalle_pedido',detalle_pedidoRoutes.default);
app.use('/api/preventa',preventaRoutes.default);
app.use('/api/ubicacion',ubicacionesRoutes.default);
app.use('/api/parametro_iess',parametro_iessRoutes.default);
app.use('/api/banco',bancoRoutes.default);
app.use('/api/parametro_iess',parametro_iessRoutes.default);
app.use('/api/banco',bancoRoutes.default);

app.use('/api/receta',receta_produccionRoutes.default);
app.use('/api/tipo_lista',tipo_lista_producRoutes.default);


//public
app.use(express.static(path.join(__dirname, 'public')));


//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});