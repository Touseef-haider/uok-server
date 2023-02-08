const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  subject:{
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
