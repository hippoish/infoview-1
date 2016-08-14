var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
//   // local : {
//   //   email        : String,
//   //   password     : String,
//   // },
//   // linkedin         : {
//   //   profile      : String,
//   //   id           : String,
//   //   token        : String,
//   //   email        : String,
//   //   name         : String
//   // }
//
  name: String,
  email: String,
  industry: String,
  id: Number,
  past_interview_companies: String
});
//
// UserSchema.methods.splitCompanies = funtion() {
//   return this.past_interview_companies.split(',')
// }

var User = mongoose.model('User', userSchema);

module.exports = User;
