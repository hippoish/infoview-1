var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  // postedBy         : {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }
  company          : String,
  content          : String,
  interviewed      : Boolean,
  positive_exp     : Boolean,
  bonus_tips       : String
  // replies          : [{
  //   text: String,
  //   postedBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User'
  //   }
  // }]
  // id               : Number
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
