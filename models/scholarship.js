const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("scholarship", scholarshipSchema);
