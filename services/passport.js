const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");
const User = require("../models/user");
const config = require("../config");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

//Create Local Strategy
const LocalLogin = new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
    User.findOne({ email }, function (err, user) {
        if (err)
            return done(err)
        if (!user)
            return done(null, false);

        user.comparePassword(password, function (err, isMatch) {
            if (err)
                return done(err);
            if (!isMatch)
                return done(null, false);
            else
                return done(null, user);
        });
    })
});

//Setup options for Strategy
const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

//Create Strategy
const JwtLogin = new JwtStrategy(JwtOptions, function (payload, done) {
    User.findById(payload.sub, function (err, user) {
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else
            return done(null, false);
    });
});

//Use Strategy
passport.use(LocalLogin);
passport.use(JwtLogin);
