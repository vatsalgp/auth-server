const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/user");

function tokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function (req, res, next) {
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        return res.status(422).send({ error: "You must provide email and password" });
    }

    //See if a user with given email exists

    User.findOne({ email }, function (err, existingUser) {
        if (err) { return next(err); }

        //If email exists, return error

        if (existingUser) {
            //Unprocessable Entity
            return res.status(422).send({ error: "Email is in use" });
        }

        //If email does not exist, create and save user record

        const user = new User({ email, password });
        user.save(function (err) {
            if (err) { return next(err); }
            //Responds indicating user was created with token for future authorization

            res.json({ token: tokenForUser(user) });
        });
    });
}