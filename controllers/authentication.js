const User = require("../models/user");

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
            //Respond to request indicating user was created

            res.json({ success: true });
        });
    });
}