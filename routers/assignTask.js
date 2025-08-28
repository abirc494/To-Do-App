const express = require("express");
const router = express.Router();
const {isLogIn} = require("../middleware");
const {saveAssignTask,completeTask, editAssignTask,editAssignTaskSave} = require("../controllers/assignTask");

router.route("/")
.post(saveAssignTask);

router.route("/:id")
.patch(completeTask)

router.route("/:id/edit")
.get(editAssignTask)
.put(editAssignTaskSave)


module.exports = router;