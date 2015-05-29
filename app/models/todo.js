var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
  text : {type : String, default: ''},
  timestamp: {type: Date, default: Date.now},
  priority: {type : Number, default: 0}
});