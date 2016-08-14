var express = require('express');
var router  = new express.Router();
var passport = require('passport')

// require controllers
var pagesController = require('../controllers/pages_controller')
var postsController = require('../controllers/posts_controller')



router.get('/', function(req, res){
  res.render('pages/home')
})
// dashboard path
router.route('/dashboard')
  .get(pagesController.dashboard);

// API for posts
router.route('/api/posts')
  .get(postsController.index)
  .post(postsController.create);

//LINKEDIN OAUTH
router.get('/auth/linkedin', passport.authenticate(
 'linkedin'
 // ,
 // { scope: ['profile', 'email'] }
));

module.exports = router;
