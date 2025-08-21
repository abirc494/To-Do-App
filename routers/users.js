const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport")
const { singUpFormRender, newUserCreated,
    logInFormRendering, logInAuthenticator, logOutFunction } = require("../controllers/users");


router.get("/singup", singUpFormRender);

router.post("/singup", newUserCreated)

router.get("/login", logInFormRendering);

router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureMessage: true
    }), logInAuthenticator);

router.get("/logout", logOutFunction)

module.exports = router;