const express = require("express");
const Config = require("./src/config")

const app = express();

app.use('/v1', require("./src/routes"));

app.listen(Config.AppPort);
