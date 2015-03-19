var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String
});

module.exports = mongoose.model('User', UserSchema);
