const express = require("express");
const mongoose = require("mongoose");
const mongoURL = require("./config");

const violatorsRouter = require("./src/routes/violators");
const getViolatorData = require("./src/services/getViolatorData");

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use("/violators", violatorsRouter);
getViolatorData();
module.exports = app;
