const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: String,
    abbreviation: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "category",
    },
    child: [
      {
        type: mongoose.Types.ObjectId,
        ref: "category",
      },
    ],
    chairman_name: {
      type: String,
    },
    image: {
      type: String,
    },
    programs: [
      {
        type: Array,
      },
    ],
    ancestors: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "category",
        },
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

module.exports = mongoose.model("category", categorySchema);
