const Assigntask = require("../models/assingtask");
const User = require("../models/users");


// module.exports.saveAssignTask = async(req,res)=>{
//     let {username, title} = req.body;
//     let curentUserId = req.user._id
//     let curentUserIdString = curentUserId.toString();
//     let taskReciverId = await User.findOne({ username: username }).select("_id");
//     if(!taskReciverId){
//         req.flash("error", "User not found")
//     }
//     let taskReceiverIdString = taskReciverId.toString()
//     if(curentUserIdString === taskReceiverIdString){
//        req.flash("error", "You can't assign your task. pleass add your personal task list")
//     }else{
//     let newAssignTask = new Assigntask({
//         title: title,
//         taskGiver: curentUserId,
//         taskReceiver: taskReciverId
//     });
//     await newAssignTask.save();
//     res.redirect("/index");}
// }

module.exports.saveAssignTask = async (req, res) => {
    let { username, title } = req.body;
    let curentUserId = req.user._id.toString();

    // find user
    let taskReceiver = await User.findOne({ username: username }).select("_id");
    if (!taskReceiver) {
        req.flash("error", "User not found");
        return res.redirect("/index");
    }

    let taskReceiverId = taskReceiver._id.toString();

    if (curentUserId === taskReceiverId) {
        req.flash("error", "You can't assign your task. Please add to your personal task list");
        return res.redirect("/index");
    }

    // save task
    let newAssignTask = new Assigntask({
        title: title,
        taskGiver: req.user._id,       
        taskReceiver: taskReceiver._id 
    });
    await newAssignTask.save();
    res.redirect("/index");
};


module.exports.completeTask = async(req,res)=>{
    let {id} = req.params;
    let complete = await Assigntask.findByIdAndUpdate(id, { completed: true });
    complete.save();
    req.flash("success", "Congratulations! You complete your task.");
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
    req.flash("success", "Successfully edit your task.");
    res.redirect("/index")
}

module.exports.deleteAssigningTask = async (req,res) => {
    let {id} = req.params;
    let deleteTaskReceiverId = await Assigntask.findByIdAndUpdate(id,{hiddenForReceiver:true})
    console.log("deleted id: "+deleteTaskReceiverId);
    req.flash("success", "your task is deleted.");
    res.redirect("/index")
    
}

module.exports.deleteAssignedTask = async (req,res) => {
    let {id} = req.params;
    let deletedItem = await Assigntask.findOneAndDelete(id);
    console.log(deletedItem);
    req.flash("success", "your task is deleted.");
    res.redirect("/index")
}