require("dotenv").config();
const User = require("../Models/user.model");
const generateJWT = require("../utils/generateJWT");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {

  // console.log(token);


  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;

  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      users: users,
    },
  });
};

const Register = async (req, res) => {
  const { firstName, lastName, email, password,role } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: email,
      message: "this email is already found",
    });
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 3);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename
  });

  //generate jwt token to async function generateJWT
  const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role });
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: {
      newUser: newUser,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: " email and password must be required",
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: " user not found",
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (user && matchPassword) {
    // "login is successfully"

  const token = await generateJWT({
    email: user.email,
    id: user._id,
    role: user.role,
  });

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        token 
      },
    });
  } else {
    return res.status(400).json({
      status: httpStatusText.SUCCESS,
      data: {
        message: "username or password is wrong",
      },
    });
  }
};

module.exports = {
  getAllUsers,
  Register,
  login,
};
