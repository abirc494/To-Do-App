const User = require("../models/users")
module.exports.singUpFormRender =
    (req, res) => {
        res.render("login/singup.ejs")
    }


module.exports.newUserCreated =
    async (req, res) => {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ username, email });
            const registeredUser = await User.register(newUser, password);
            req.logIn(registeredUser, (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/index")
                req.flash("success", "Welcome! You are now our authorized member.");
            })
        } catch (err) {
            console.log(err);
            res.redirect("/singup")
            req.flash("error", "Plear try again");
        }
    }


module.exports.logInFormRendering =
    (req, res) => {
    res.render("login/login.ejs")
}


module.exports.logInAuthenticator =
    (req, res) => {
        res.redirect("/index")
        req.flash("success", "You have logged in successfully!");
    }


module.exports.logOutFunction =
    (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Please try again");
        } else {
            res.redirect("/login")
            req.flash("success", "Successfuly you locked out of here.");
        }
    })
}
