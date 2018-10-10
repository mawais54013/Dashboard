const router = require("express").Router();
const reminderController = require("../../controller/reminderController");
//Matches with /api/reminders
router.route("/")
.get(reminderController.findAll)
.post(reminderController.create);

router
.route("/:id")
.get(reminderController.findById)
.put(reminderController.update)
.delete(reminderController.remove);

module.exports=router;