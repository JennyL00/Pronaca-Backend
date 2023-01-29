const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const itemRoutes = require("./routes/itemRoutes");
const empleadoRoutes = require("./routes/empleadosRoutes");
const cargo_empleadoRoutes = require("./routes/cargo_empleadoRoutes");
const asientoRoutes = require("./routes/asientoRoute");
const cuentaRoutes = require("./routes/cuentaRoutes");
const clienteRoutes = require("./routes/clientesRoutes");
const pedidoRoutes = require("./routes/pedidosRoutes");

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
app.use('/links',require('./routes/links'));
app.use('/api/item', itemRoutes.default);
app.use('/api/empleado', empleadoRoutes.default);
app.use('/api/cargo_empleado', cargo_empleadoRoutes.default);
app.use('/api/asiento', asientoRoutes.default);
app.use('/api/cuenta', cuentaRoutes.default);
app.use('/api/cliente',clienteRoutes.default);
app.use('/api/pedido',pedidoRoutes.default);

//public
app.use(express.static(path.join(__dirname, 'public')));


//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});