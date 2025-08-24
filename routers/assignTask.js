const express = require("express");
const router = express.Router();
const {isLogIn} = require("../middleware");
const {saveAssignTask} = require("../controllers/assignTask");

router.route("/")
.post(saveAssignTask)


module.exports = router;