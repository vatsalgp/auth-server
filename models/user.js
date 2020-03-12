const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

//Define Model

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

//On Save Hook, encrypt password

userSchema.pre("save", function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});


//Create Model Class

const ModelClass = mongoose.model("user", userSchema);

//Export Model

module.exports = ModelClass;