const Assigntask = require("../models/assingtask");
const User = require("../models/users");

module.exports.saveAssignTask = async(req,res)=>{
    let {username, title} = req.body;
    let curentUserId = req.user._id
    let taskReciverId = await User.findOne({ username: username }).select("_id");
    let newAssignTask = new Assigntask({
        title: title,
        taskGiver: curentUserId,
        taskReceiver: taskReciverId
    });
    await newAssignTask.save();
    res.redirect("/index");
}