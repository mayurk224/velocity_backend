const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
} = {}) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userModel.create({
    fullname: {
      firstname: firstname,
      lastname: lastname,
    },
    email,
    password: hashedPassword,
  });

  return user;
};
