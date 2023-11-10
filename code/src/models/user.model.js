const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // googleId: {
    //   type: String,
    //   required: true,
    // },
    // displayName: {
    //   type: String,
    //   required: true,
    // },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user", "subadmin"],
    },
    token: {
      type: String,
    }, is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);
module.exports=User;