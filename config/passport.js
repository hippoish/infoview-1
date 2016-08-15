var passport         = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var User             = require('../models/User');


// serialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user) {
      callback(err, user);
  });
});

/////////////////////////////
/// LinkedIn Authorization///
/////////////////////////////

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK,
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
},
// linkedin will send back token and profile, we will give a cb fcn
function(accessToken, refreshToken, profile, cb) {
  // asynchronous verification
  // console.log(profile)
  console.log(profile.id);
  console.log(profile.email);
  console.log(profile.firstName);
  console.log(profile.lastName);
  process.nextTick(function () {

    // find the user in the db based on their linkedin id
    User.findOne({'linkedinId': profile.id}, function(err, user) {
      if(err) return cb(err);
      if(user) {
        console.log('found user');
        return cb(null, user);
      } else {
        console.log('creating user');
        var newUser = new User({
          // linkedin.token = profile.token,
          // id        : profile.id,
          // email     : profile.emails[0].value,
          // firstName : profile.firstName,
          // lastName  : profile.lastName,
          // industry  : profile.industry,
          // headline  : profile.headline,
          // profileUrl: profile.profileUrl,
          // pictureUrl: profile.pictureUrl
        });

        // save user to our db
        newUser.save(function(err) {
          // what to do if there is an error
          if(err) return cb(err);
          // if successful, return the new user
          console.log(newUser);
          return cb(null, newUser);
        });
      }
    });
  });

}));

// export the linked in strategy and passport
module.exports = LinkedInStrategy;
module.exports = passport;
