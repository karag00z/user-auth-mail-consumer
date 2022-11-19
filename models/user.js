const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    birth_day: {
      type: Date,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
    },
    cell: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatar_public: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    activationKey: {
      type: String,
    },
    passwordResetKey: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
