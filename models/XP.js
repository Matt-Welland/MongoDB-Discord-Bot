/**
 * Define MongoDB schema using Mongoose
 */
var mongoose = require('mongoose');

var cookieSchema = new mongoose.Schema({
  rsn: String,
  xp: Number,
  rank: String,
  talkedGame: String,
  talkedDiscord: String,
  hostedEvent: String,
  attendedEvent: String,
  recruited: String,
});

// Exporty export
module.exports = mongoose.model('xp', cookieSchema);
