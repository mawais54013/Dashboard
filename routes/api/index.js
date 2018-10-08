const router = require("express").Router();
const reminderRoutes = require("./reminders");

router.use("/reminders", reminderRoutes);

module.exports = router;
