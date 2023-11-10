const mongoose = require("mongoose");

/** token schema */
const otpSchema = mongoose.Schema(
  {
    otp: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    is_active:{
      type:String,
      default:true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Token = mongoose.model("verifyotp", otpSchema);

module.exports = Token;