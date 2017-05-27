const config = require('./config');
hbs = require('express-handlebars');
http = require('http');
bodyParser = require('body-parser');
express = require('express');
session = require('express-session');

// express instance
const app = express();
const server = http.createServer(app);

// sessions handling
app.use(session({
    secret: "randomString123",
    resave: true,
    saveUninitialized: false
}));

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// default port
let port = 3000;

// Setting up Handlebars view engine
app.use('/public', express.static('public'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials'
}));

// Routes 
require('./routes/index')(app);
require('./routes/cars')(app);
// require('./backend/customer')(app);
require('./routes/orders')(app);


// start server
server.listen(port, () => {
    console.log('Listening at localhost/');
});