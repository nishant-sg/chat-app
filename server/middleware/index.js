const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token");
    console.log(token,process.env.JWT_SECRET);
    const user = jwt.decode(token, process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
  } else {
      console.log("requires to login ")
      return res.status(234).json({ error: "Authorization required" });
  }
  console.log("checked user is signed in");
  next();
};

exports.adminMiddleware = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role !== "admin") {
    return res.status(234).json({ error: "Authorization required" });
    //console.log(res.status);
  }else{
    console.log("haa");
    next();
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "fresher") {
    return res.status(400).json({ error: "You are not user" });
  }
  next();
};
