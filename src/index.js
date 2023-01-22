const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const itemRoutes = require("./routes/itemRoutes");

//initialization
const app = express();

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

//public
app.use(express.static(path.join(__dirname, 'public')));

// Inconveniente con CORS
app.use(function(req, res, next) {    
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');    
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');    next();
});
//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});