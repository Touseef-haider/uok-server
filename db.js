const mongoose = require("mongoose");

const connect = async (url, options) => {
  try {
    await mongoose.connect(url, options);
    console.log("Connected to database ", url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
