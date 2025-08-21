const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    completed:{
        type: Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type: Schema.ObjectId,
        ref: "User"
    }
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;