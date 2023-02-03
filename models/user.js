const mongoose = require("mongoose");
const { ROLES } = require("../utils/constant");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    seat_number: {
      type: String,
    },
    admin_id: {
      type: String,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    program: {
      type: mongoose.Types.ObjectId,
      ref: "program",
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    semester: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    is_pass_out: {
      type: Boolean,
      default: false,
    },
    pass_out_date: {
      type: Date,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.STUDENT],
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("user", userSchema);
