const  User  = require("../models/user.model");
const joi = require("joi");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnu";
const { userService, emailService } = require("../services");
const { auth } = require("../middlewares/auth");
const ejs = require("ejs");
const path = require("path");
// const { User } = require("../models");

/** create user */
const register = async (req, res) => {
  try {
    const reqBody = req.body;
    const userExists = await userService.getUserByEmail(reqBody.email);
    if (userExists) {
      throw new Error("User already created by this email!");
    }

    const user = await userService.createUser(reqBody);

    if (!user) {
      throw new Error("Something went wrong, please try again or later!");
    }

    ejs.renderFile(
      path.join(__dirname, "../views/otp-template.ejs"),
      {
        email: reqBody.email,
        otp: ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4),
        first_name: reqBody.first_name,
        last_name: reqBody.last_name,
      },
      async (err, data) => {
        if (err) {
          let userCreated = await userService.getUserByEmail(reqBody.email);
          if (userCreated) {
            await userService.deleteUserByEmail(reqBody.email);
          }
          throw new Error("Something went wrong, please try again.");
        } else {
          emailService.sendMail(reqBody.email, data, "Verify Email");
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "User create successfully!",
      data: { user },
      data:`user otp is stored ${otp}`
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/**login  */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userService.findUserByEmail({ email });
    if (!findUser) throw Error("User not found");
    const successPassword = await bcrypt.compare(password, findUser.password);
    if (!successPassword) throw Error("Incorrect password");
    let option = {
      email,
      role: findUser.role,
      exp: moment().add(1, "days").unix(),
    };
    let token;
    if (findUser && successPassword) {
      token = await jwt.sign(option, jwtSecrectKey);
    }
    let data;
    if (token) {
      data = await userService.findUserAndUpdate(findUser._id, token);
    }
    res
      .status(200)
      .json({
        success: true,
        message: "User create successfully!",
        data: { data },
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
/*forget password*/
const forgetPassword=async(req,res)=>{
try {
  const email=req.body.email;
  const userdata=await userService.findUserByEmail({email});
  if(!userdata){
    const randomString=randomString.generate();
    const data=await userService.findUserAndUpdate(userdata.email,token);
    sendResetPasswordMail(userdata.first_name,userdata.email,randomString);
    res.status(200).json({success:true,message:"please check your inbox",data:userdata});
  }else{
    res.status(404).json({success:true,message:"this eamial does not exists"});
  }
} catch (error) {
  res.status(400).json({success:false,message:error.message});
}
}
/**upadte password */
const updatePassword = async (req, res) => {
  try {
    const { id, email } = req.params;
    console.log(req.params);
    const resetToken = await User.findOne({ userId: id, email });
    if (!resetToken) {
      return res.status(404).send({ message: "INVALID LINK!!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    await resetToken.deleteOne();

    res.status(200).send({ message: "PASSWORD UPDATED SUCCESSFULLY!!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "SERVER ERROR!!!" });
  }
};


// get user
const getAllUser = async (req, res) => {
  try {
    console.log(req.headers.token, "");
    await auth(req.headers.token, ["admin"]);

    const data = await userService.getAllUser({ role: "admin" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// change password


module.exports = {
  register,
  login,
  getAllUser,

  forgetPassword,
  updatePassword
};
