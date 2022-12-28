require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.listen(port, () =>
  console.log(
    " 🚀 " +
      chalk.green("Welcome to the GogoApps NASA API") +
      `> Listening on port ${port}...`
  )
);

module.exports = app;
