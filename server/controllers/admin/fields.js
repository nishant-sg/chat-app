const User = require("../../models/user");

exports.userFields = async (req, res) => {
  try {
    const data = ["name", "email", "rollNumber","role","college"]
    res.status(200)
    res.send({ status: "User Created" , data : data});
  } catch (err) {
    res
      .status(422)
      .json({ status: "Something went wrong" });
  }
};
