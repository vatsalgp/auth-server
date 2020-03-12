//Starting point of server

var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./router");
const app = express();

//DB Setup

mongoose.connect("mongodb://localhost:auth/auth", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

//App Setup

app.use(morgan("combined")); // For logging requests
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
