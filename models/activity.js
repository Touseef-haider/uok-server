const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  charges: {
    type: Number,
  },
  timing: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("activity", activitySchema);
