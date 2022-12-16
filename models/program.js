const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programSchema = new Schema(
  {
    name: {
      type: String,
    },
    duration: {
      type: Number,
    },
    is_deleted: {
      type: Boolean,
    },
    courses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("program", programSchema);
