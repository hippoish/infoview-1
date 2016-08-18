var mongoose = require('mongoose');
var env = require('dotenv');

// Use different database URIs based on whether an env var exists.
var dbUri = process.env.MONGODB_URI ||
            'mongodb://localhost/' + process.env.LOCAL_DB;

if (!process.env.MONGODB_URI) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("PRESTIGE WORLDWIDE NEEDS INVESTMENTS FROM MONGOD!");
    process.exit(0);
  });
}

mongoose.connect(dbUri);

module.exports = mongoose;
