var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  company          : String,
  content          : String,
  interviewed      : Boolean,
  positive_exp     : Boolean,
  bonus_tips       : String,
  replies          : Array,
  // id               : Number
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
