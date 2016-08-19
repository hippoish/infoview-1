var passport = require('passport');
var express  = require('express');
var router   = new express.Router();

// require controllers
var pagesController = require('../controllers/pages_controller')
var postsController = require('../controllers/posts_controller')

// route path:
router.route('/')
  .get(pagesController.landing)
// about path:
router.route('/about')
  .get(pagesController.about);

// dashboard path:
router.route('/dashboard')
  .get(pagesController.dashboard);



//chat path;
 router.route('/chat')
   .get(pagesController.chat);

// app.get ('/chat', function(req, res){
//   res.sendFile(__dirname + '/index.ejs');
// });

// API for posts
router.route('/api/posts')
  .get(postsController.index)
  .post(postsController.create);

// deleting posts from API
router.route('/api/posts/:id')
  .get(postsController.show)
  .delete(postsController.destroy);

////////////////////////////////////////////
///////////// LINKEDIN OAUTH ///////////////
////////////////////////////////////////////
router.get('/', function(req, res, next){
  console.log('get request');
  res.render('/', {user: req.user});
});

router.get('/auth/linkedin', passport.authenticate(
 ('linkedin')/*,*/
 // { scope: ['profile', 'email'] }
));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
