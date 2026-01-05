const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique:true
    },

    password: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false, versionKey: false }
);

const User = model("User", UserSchema);

module.exports = User;
