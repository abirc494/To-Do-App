

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
            })
        } catch (err) {
            console.log(err);
            res.redirect("/singup")
        }
    }


module.exports.logInFormRendering =
    (req, res) => {
    res.render("login/login.ejs")
}


module.exports.logInAuthenticator =
    (req, res) => {
        res.redirect("/index")
    }


module.exports.logOutFunction =
    (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login")
        }
    })
}
