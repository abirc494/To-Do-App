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

module.exports.completeTask = async(req,res)=>{
    let {id} = req.params;
    let complete = await Assigntask.findByIdAndUpdate(id, { completed: true });
    complete.save();
    res.redirect("/index")
}

module.exports.editAssignTask = async(req,res)=>{
    let {id} = req.params;
    let taskInfo = await Assigntask.findById(id)
    res.render("assignTaskEdit.ejs", {taskInfo})
};

module.exports.editAssignTaskSave = async (req,res) => {
    let {id} = req.params;
    let {title} = req.body;
    let newTitle = await Assigntask.findByIdAndUpdate(id,{title:title})
    res.redirect("/index")
}