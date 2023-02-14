/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const connect = require("./db");
const routes = require("./routes");
const config = require("./config");
const cloudinary = require('cloudinary');

const app = express();

// connect database
connect(config.db);

// parsing body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
// security
app.use(helmet());
// logging
app.use(logger("dev"));
// cross origin resource sharing
app.use(cors());

//Setting up Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// request headers
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// main route
app.get("/", (req, res) => {
  return res.status(200).json({ message: `Hi from UOK server`, status: 200 });
});

// apis
app.use("/api", routes);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  return res.json({
    message: err.message,
    error: err,
  });
});

// server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
