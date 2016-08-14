var Post = require('../models/Post')

module.exports = {
  dashboard: dashboard
}

// function dashboard(req, res, next) {
//   Post.find({}, function(err, posts) {
//     if (err) res.json( {msg: 'There was an error; bummer!' + err} );
//     res.render('pages/dashboard', {numberOfPosts: posts.length});
//   });
// };

function dashboard(req, res, next) {
  res.render('pages/dashboard');
};
