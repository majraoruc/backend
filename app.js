const express = require("express");
const app = express();
const cors = require('cors')

require("dotenv").config();

process.on("uncaughtException", err => {
    console.log(err);
});

process.on("unhandledRejection", err => {
    console.log(err);
});

app.use(cors());

require("./api")(app);

module.exports = app;