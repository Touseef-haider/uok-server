const mongoose = require("mongoose");

const connect = async (configuration) => {
  try {
    let url = "";
    switch (process.env.NODE_ENV) {
      case "dev":
        url = configuration.dev;
        break;
      case "prod":
        url = configuration.prod;
        break;
      case "local":
        url = configuration.local;
        break;

      default:
        break;
    }
    if (url) {
      await mongoose.connect(url, configuration.options);
      console.log("Connected to database ", url);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
