const passport = require("passport");
const authentication = require("./controllers/authentication");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function (app) {
    app.get("/", function (req, res, next) { res.send("Hello World") });
    app.get("/data", requireAuth, function (req, res, next) { res.send({ data: "It's Protected" }) });
    app.post("/signup", authentication.signup);
    app.post("/signin", requireSignIn, authentication.signin);
}