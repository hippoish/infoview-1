var User = require('../models/user');

module.exports = {
  show: show
}

// return a user from the db as json
function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err || !user) {
      next (err);
    } else {
      res.json(user);
    }
  })
}
