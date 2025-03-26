const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captianService = require("../services/captian.service");
const bcrypt = require("bcrypt");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExists = await captainModel.findOne({ email });

  if (isCaptainAlreadyExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const captain = await captianService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType, // Corrected field name
  });

  const token = captain.generateAuthToken(); // Corrected method name
  res.status(201).json({ captain, token });
};
