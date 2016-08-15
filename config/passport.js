var passport         = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var User             = require('../models/User');

//////////////////////////////
/// LinkedIn Authorization ///
//////////////////////////////

passport.use(new LinkedInStrategy({
  // pull in the app id and secret from .env file
  clientID     : process.env.LINKEDIN_CLIENT_ID,
  clientSecret : process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL  : process.env.LINKEDIN_CALLBACK,
  scope        : ['r_emailaddress', 'r_basicprofile'],
  state        : true
},
// linkedin will send back token and profile, we will give a cb fcn
function(accessToken, refreshToken, profile, cb) {
  // asynchronous verification
  console.log(profile)
  console.log(profile.id);
  console.log(profile.emails[0]);
  console.log(profile.displayName);
  // console.log(r_basicprofile)
  // console.log(profile.lastName);

  // asynchronous verification
  process.nextTick(function () {

    // find the user in the db based on their linkedin id
    User.findOne({'linkedin.id': profile.id}, function(err, user) {
      // console.log('user is ' + user.linkedin.email)
      // if there's an error:
      if(err) return cb(err);

      // if the user is found, log them in:
      if(user) {
        console.log('found user' + user);
        return cb(null, user);
      } else {
        console.log('creating user');
        // if no user is found with that linkedin id, create them by setting fields from the returned profile attributes
        var newUser = new User({
          linkedin : {
            token      : profile.token,
            id         : profile.id,
            email      : profile.emails[0].value,
            firstName  : profile.displayName,
            lastName   : profile.lastName,
            industry   : profile.industry,
            headline   : profile.headline,
            profileUrl : profile.profileUrl,
            pictureUrl : profile.pictureUrl
          }
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
    })
  });

}));

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

// export the linked in strategy and passport
module.exports = LinkedInStrategy;
module.exports = passport;
