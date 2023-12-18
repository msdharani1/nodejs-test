// models/musicModel.js
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: String,
  artist: String,
  imageUrl: String,
  trackUrl: String,
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
