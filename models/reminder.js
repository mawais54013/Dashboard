const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  reminder: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;