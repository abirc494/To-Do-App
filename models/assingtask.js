const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const assignTaskSchema = new Schema({
    title:{
        type:String,
        required: true
    },
     completed:{
        type: Boolean,
        default:false
    },
    taskGiver:{
        type: Schema.ObjectId,
        ref: "User"
    },
    taskReceiver:{
        type: Schema.ObjectId,
        ref: "User"
    }

});

const Assigntask = mongoose.model("Assigntask", assignTaskSchema);
module.exports = Assigntask;