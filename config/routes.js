var express = require('express'),
    router  = new express.Router();

router.get('/', function(req, res){
  res.render('index')
})




module.exports = router;
