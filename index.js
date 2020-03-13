//Starting point of server

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
const app = express();

//DB Setup

mongoose.connect("mongodb://localhost:auth/auth", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

//App Setup

const corsOptions = {
    origin: "https://auth-28.netlify.com", //No ending slash 
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan("combined")); // For logging requests
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup

const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
