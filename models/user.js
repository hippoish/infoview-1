var mongoose = require('mongoose');

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
  },
  linkedin         : {
    profile      : String,
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});


var User = mongoose.model('User', userSchema);

module.exports = User;
