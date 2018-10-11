const router = require("express").Router();
const reminderRoutes = require("./reminders");
const test = require("./test");
const weather = require("./weather");

router.use("/", test);
router.use("/reminders", reminderRoutes);
router.use("/weather", weather);


module.exports = router;
