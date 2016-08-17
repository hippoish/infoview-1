var Post = require('../models/Post')

module.exports = {
  landing: home,
  about: about,
  dashboard: dashboard
}

// action to render the home page
function home(req, res, next) {
  res.render('pages/landing');
}

// action to render the about page
function about(req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) res.json( {msg: 'There was an error; bummer!' + err} );
    res.render('pages/about', {numberOfPosts: posts.length});
  });
};

// action to render the dashboard with posts list
function dashboard(req, res, next) {
  res.render('pages/dashboard');
};
