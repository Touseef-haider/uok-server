/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connect = require("./db");
const routes = require("./routes");
const config = require("./config");

const app = express();

connect(config.db);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: `Hi from UOK server`, status: 200 });
});

// apis
app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
