var express = require('express');
var router  = new express.Router();
var passport = require('passport')


router.get('/', function(req, res){
  res.render('pages/home')
})

//LINKEDIN OAUTH
router.get('/auth/linkedin', passport.authenticate(
 'linkedin'
));


module.exports = router;
