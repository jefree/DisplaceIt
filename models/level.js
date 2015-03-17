var mongoose = require('mongoose');

var LevelSchema = mongoose.Schema({
  chars: [mongoose.Schema.Types.Mixed],
  winPos: mongoose.Schema.Types.Mixed,
  number: Number
});

module.exports = mongoose.model('Level', LevelSchema);
