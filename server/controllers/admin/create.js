const User = require("../../models/user");

exports.createUser = async (req, res) => {
  console.log("creating new User",req.body.email);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      rollNumber: req.body.rollNumber,
      college: req.body.college,
      password: req.body.password,
    });
    console.log("user created")
    res.status(200).json({ status: "User Created" });
  } catch (err) {
    res.status(234).json({ status: "User with this email already exists. Update record instead" });
  }
};
