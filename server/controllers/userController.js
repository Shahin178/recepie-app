const { mongo } = require("mongoose");
const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const User = await UserModel.findOne({ email });
    if (User) {
      return res.status(500).json({
        message: "User already exists",
        status: false,
      });
    }
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
      status: false,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "User does not exist, please register first",
        status: false,
      });
    }
    if (user.password !== password) {
      // Incorrect password
      return res.status(500).json({
        message: "Password is incorrect",
        status: false,
      });
    }
    // Password is correct, login successful
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
      status: false,
    });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
};
