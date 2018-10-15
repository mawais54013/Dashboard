const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weather = new Schema({
  userID: { type: String, required: true },
  locations: []
});

const Weather = mongoose.model("Weather", weather);

module.exports = Weather;