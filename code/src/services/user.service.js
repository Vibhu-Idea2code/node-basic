const { User } = require("../models");

const createUser = async (body) => {
  return await User.create(body);
};

const findUserByEmail = async (email) => {
  return await User.findOne(email);
};
const findUserByPassword = async (passowrd) => {
  return await User.findOne(passowrd);
};
const findUserAndUpdate = async (_id, token) => {
  return await User.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getAllUser = async (role) => {
  return await User.find(role);
};

const getUserList = async (filter, options) => {
  return User.find();
};
const getUserById = async (userId) => {
  return User.findById(userId);
};
const deleteUserByEmail = async (email) => {
  return User.findOneAndDelete({ email: email });
};
const findEmailAndUpdate = async (_id, token) => {
  return await User.updateOne(
   {email},
    {
      $set: { token },
    },
    { new: true }
  );
};
const findByPassowrdAndUpdate=async(_id,newpassowrd)=>{
return await User.findByIdAndUpdate(
  {_id},
  {
    $set: { newpassowrd },
  },
  { new: true }
)
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserAndUpdate,
  getAllUser,
  getUserList,
  getUserByEmail,
  getUserById,
  deleteUserByEmail,
  findEmailAndUpdate,
  findByPassowrdAndUpdate,
  findUserByPassword
};