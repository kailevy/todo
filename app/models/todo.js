// define model =================
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text : String
});