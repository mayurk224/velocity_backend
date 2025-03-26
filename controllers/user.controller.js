const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password } = req.body;
    const { firstname, lastname } = fullname;

    console.log(req.body);

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ user, token });
};

module.exports.getProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  await blacklistTokenModel.create({token})
  res.status(200).json({ message: "User logged out" });
};
