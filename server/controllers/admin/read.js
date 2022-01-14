const User = require("../../models/user");

exports.readUser = async (req, res) => {
  console.log("read new User",req.body.email);
  try {
    const user = await User.findOne({
        email: req.body.email,
      });
    console.log(user.name)
    
    res.status(200).json({ user: {name:user.name,email:user.email,rollNumber:user.rollNumber,role:user.role,college:user.college} });
  } catch (err) {
    console.log("error",err)
    res
      .status(123)
      .json({ status: "User with this email already exists. Update record instead" });
  }
};
