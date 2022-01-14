const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  console.log("body2-");
  console.log(req.body.password, process.env.ADMIN_PASSWORD);
  let role;
  try {
    if (req.body.password === process.env.ADMIN_PASSWORD) {//handling admin
      role = "admin";
    }else{
      role = "fresher";
    }
    await User.create({
      name: req.body.name,
      email: req.body.email,
      role : role,
      password: req.body.password,
    });
    res.status(200).json({ status: "OK" });
  } catch (err) {
    res
      .status(422)
      .json({ status: "User with this email already exists. Please Sign In" });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  console.log("user");
  console.log(user);

  if (!user) {
    return { status: "Invalid User" };
  }
  console.log(user.hash_password)
  console.log(req.body.password);
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.hash_password,
  );
    console.log(isPasswordValid);
    console.log(process.env.JWT_SECRET);
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role : user.role,
        password: user.hash_password,
      },
      process.env.JWT_SECRET,
      {expiresIn : "1d"}//to be completed later ;jwt.verify is giving issues
    );
    res.status(200).json({status: "ok", token: token,user: user});
  } else {
    res.status(403).json({status:"Wrong Password"});
  }
};
