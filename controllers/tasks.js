const Task = require("../models/tasks");
const User = require("../models/users")
const Assigntask = require("../models/assingtask");

module.exports.allTasks = 
    async (req, res) => {
        let userId = req.user._id
        const user = await User.findById(userId, 'username');
        const taskReceiver = await Assigntask.find({taskReceiver:userId})
        console.log(taskReceiver); 
        const tasks = await Task.find({user:req.user._id})
        res.render("index.ejs", { tasks, user, taskReceiver })
    }


module.exports.saveTasks = 
    async (req, res) => {
        let {title} = req.body;
        let newTask = new Task({
            title,
            user: req.user._id
        })
        await newTask.save()
        res.redirect("/index")
    
    }


module.exports.editTask = 
    async (req, res) => {
    let { id } = req.params;
    let task = await Task.findById(id)
    res.render("edit.ejs", { task })
};

module.exports.saveEditTask = 
    async (req, res) => {
    let { id } = req.params;
    let editTask = req.body;
    let newTask = await Task.findByIdAndUpdate(id, { title: editTask.title });
    newTask.save()
    res.redirect("/index")
}


module.exports.completeFunction = 
    async (req, res) => {
    let { id } = req.params;
    let complete = await Task.findByIdAndUpdate(id, { completed: true });
    complete.save();
    res.redirect("/index")
}


module.exports.delteTask = 
    async (req, res) => {
    let { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/index")
};
