// set up
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// configs
mongoURI = process.env.MONGOURI || "mongodb://localhost";
mongoose.connect(mongoURI);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(logger('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var PORT = process.env.PORT || 4000;

// routes
var routes = require('./app/routes.js');
app.get('*', routes.home);
app.get('/api/todos',routes.getAllTodos);
app.post('/api/todos',routes.createTodo);
app.delete('api/todos/:todo_id',routes.deleteTodos);

// listen
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
