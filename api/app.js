const express = require("express");
const violatorsRouter = require("./src/routes/violators");

const app = express();
app.use(violatorsRouter);
module.exports = app;
