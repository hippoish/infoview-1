var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var User = require('../models/User')

passport.use(new LinkedInStrategy({
  clientID: '75h23xco7vaauw',
  clientSecret: '3pZbGoZxqTa2Av7A',
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });

  passport.serializeUser(function(user, done) {
   done(null, user.id);
});

  passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
});

}));

module.exports = LinkedInStrategy;
module.exports = passport;
