const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "profile",
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
