var passport = require('passport')
var express  = require('express');
var router   = new express.Router();

// require controllers
var pagesController = require('../controllers/pages_controller')
var postsController = require('../controllers/posts_controller')

// route path:
router.route('/')
  .get(pagesController.home)
// about path:
router.route('/about')
  .get(pagesController.about);
// dashboard path:
router.route('/dashboard')
  .get(pagesController.dashboard)

// API for posts
router.route('/api/posts')
  .get(postsController.index)
  .post(postsController.create);

//LINKEDIN OAUTH
router.get('/auth/linkedin', passport.authenticate(
 'linkedin', { scope: ['profile', 'email'] }
));

router.get('/', function(req, res, next){
  console.log('get request');
  res.render('dashboard', {title: 'Infoviewwwwwww', user: req.user});
};)

module.exports = router;
