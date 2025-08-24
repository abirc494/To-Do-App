const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users");
const taskRoute = require("./routers/tasks.js")
const userRoute = require("./routers/users.js")
const assignRoute = require("./routers/assignTask.js");



//Database setup
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/toDoApp')
};

main().then((result) => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
})


// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

// form data parseing middleware
app.use(express.urlencoded({ extended: true }));
// css middleware
app.use(express.static(path.join(__dirname, "public")))
// methodOverride middleware
app.use(methodOverride('_method'))

const sessionOption = {
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
}

// cookie's meddilware
app.use(session(sessionOption));
app.use(flash());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// passport local middleware
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.curentUser = req.user;
    next()
})

// task router
app.use("/index",taskRoute )

// singup function
app.use("/",userRoute)

app.use("/assign", assignRoute);


// middleware
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "something went wrong"} = err;
    res.send(message);
})

app.listen(3000, () => {
    console.log("server is start");
});