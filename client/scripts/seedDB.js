const mongoose = require("mongoose");
const db = require("../../models");

mongoose.connect(
    process.env.MONGODB_URI || 
    "mongodb://localhost/dashboard"
);

const reminderSeed = [
  {
    reminder: "pet the cat",
    date: new Date(Date.now())
  }
];

db.Reminder
  .remove({})
  .then(() => db.Reminder.collection.insertMany(reminderSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });