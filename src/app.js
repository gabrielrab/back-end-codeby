const express = require("express");
const bodyParser = require("body-parser");
const requireDir = require("require-dir");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(cors());
app.use((req, res, next) => {
  req.io = io;

  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

requireDir("./models");
app.use("/", require("./routes"));

module.exports = { app: app, server: server };
