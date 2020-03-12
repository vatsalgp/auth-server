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

//Before saving a model, run this function
userSchema.pre("save", function (next) {
    const user = this;

    //Generate a salt, then run function
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        //Hash password using salt, then run function
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            //Overwrite password with hash
            user.password = hash;

            //Save the model
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return callback(err);
        else
            callback(null, isMatch);
    });
};

//Create Model Class

const ModelClass = mongoose.model("user", userSchema);

//Export Model

module.exports = ModelClass;