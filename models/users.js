const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    username: { type: String, 
        required: true
    },
    email:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    taskGiven:[{
        type: Schema.ObjectId,
        ref:"Assigntask"
    }],
    taskReceiver:[{
        type: Schema.ObjectId,
        ref:"Assigntask"
    }]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;