var express = require('express');
var app = express();
var express = require('express');
var app = express(); // create our app w/ express
var path = require('path');
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

var config = require('./config/app.config');

//db config
var database = require('./config/database');

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
app.set('superSecret', config.secret); // secret variable

app.set('port', (process.env.PORT || 8080));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/hello', function(request, response) {
    response.send('hello');
});

app.get('/new-one', function(request, response) {
    response.send('new-one');
});

app.get('/new-two', function(request, response) {
    response.send('new-two');
});




app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});