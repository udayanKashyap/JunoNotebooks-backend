const jwt = require("jsonwebtoken");

const handleUserAuth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;
    req.user = user.username;
    console.log("jwt verified");
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  }
};

module.exports = handleUserAuth;
