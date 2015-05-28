var Todo = require('./models/todo');

// function to get all todos
function getTodos(res){
  Todo.find(function(err, todos) {
    if(err) {
      res.send(err);
      }

    res.json(todos);
  });
}

// for get request
var getAllTodos = function(req, res) {
  getTodos(res);
};

// for post request
var createTodo = function(req, res) {
  // make todo with AJAX request from Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err) {
      res.send(err);
    }
    // get all todos afterwards
    getTodos(res);
  });
};

// for delete request (?)
var deleteTodo = function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err,todo) {
    if (err) {
      res.send(err);
    }
    // get all todos afterwards
    getTodos(res);
  });
};

// loads view files
var home = function(req, res) {
  res.sendFile('./public/index.html'); 
};

// export the functions for server.js
module.exports.getAllTodos = getAllTodos
module.exports.createTodo = createTodo
module.exports.deleteTodo = deleteTodo
module.exports.home = home