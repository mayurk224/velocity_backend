const { validationResult } = require("express-validator");
const userService = require("../services/user.service");

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
