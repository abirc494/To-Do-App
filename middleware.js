const Task = require("./models/tasks");


module.exports.isLogIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/login")
    }
    next()
    };

