const express = require("express");
const router = express.Router();
const {saveAssignTask,completeTask, editAssignTask,editAssignTaskSave,
    deleteAssigningTask, deleteAssignedTask} = require("../controllers/assignTask");


router.route("/")
.post(saveAssignTask);

router.route("/:id")
.patch(completeTask)
.delete(deleteAssigningTask)

router.route("/:id/delete")
.delete(deleteAssignedTask)
router.route("/:id/edit")
.get(editAssignTask)
.put(editAssignTaskSave)


module.exports = router;