var passport = require('passport');
var express  = require('express');
var router   = new express.Router();

// require controllers
var pagesController = require('../controllers/pages_controller');
var postsController = require('../controllers/posts_controller');
var usersController = require('../controllers/users_controller');

// root path:
router.route('/')
  .get(pagesController.landing);

// API for posts
router.route('/api/posts')
  .get(postsController.index)
  .post(postsController.create);

// API for a single post
router.route('/api/posts/:id')
  .get(postsController.show)
  .patch(postsController.update)
  .delete(postsController.destroy);

// getting a user from the API
router.route('/api/users/:id')
  .get(usersController.show);

////////////////////////////////////////////
///////////// LINKEDIN OAUTH ///////////////
////////////////////////////////////////////
router.get('/', function(req, res, next){
  res.render('/', {user: req.user});
});

// route for login with linkedin
router.get('/auth/linkedin', passport.authenticate(('linkedin')));

// route for after login
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

// route for logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
