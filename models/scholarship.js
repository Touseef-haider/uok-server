const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scholarshipSchema = new Schema({
  name: {
    type: String,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  semester: {
    type: String,
  },
  charges: {
    type: Number,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("scholarship", scholarshipSchema);