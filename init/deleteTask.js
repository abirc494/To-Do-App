const mongoose = require("mongoose");
const Task = require("../models/tasks");


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/toDoApp')
};

main().then((result)=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

let dateTask = async()=>{
   await Task.deleteMany({})
   console.log("Tasks delete completed.");
};

dateTask();