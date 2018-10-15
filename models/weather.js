const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weather = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  locations: []
});

const Weather = mongoose.model("Weather", weather);

module.exports = Weather;