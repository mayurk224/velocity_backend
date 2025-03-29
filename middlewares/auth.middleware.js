const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

const validateToken = async (token) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    throw new Error("Token is blacklisted");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const decoded = await validateToken(token);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const decoded = await validateToken(token);
    const captain = await captainModel.findById(decoded.id);
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally, include user details in the response
    return res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
