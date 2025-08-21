const express = require("express");
const router = express.Router();
const { isLogIn } = require("../middleware")
const { allTasks, saveTasks, editTask,
    saveEditTask, completeFunction, delteTask } = require("../controllers/tasks.js")

router.route("/")
.get(isLogIn, allTasks)
.post(isLogIn, saveTasks);

router.route("/:id")
.patch(completeFunction)
.delete(delteTask);

router.route("/:id/edit")
.get(editTask)
.put(saveEditTask);

module.exports = router