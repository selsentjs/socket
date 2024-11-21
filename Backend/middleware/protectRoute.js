const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const productRoute = async (req, res, next) => {
  try {
    // Get JWT from the cookies sent with the request
    const token = req.cookies.jwt;
   // console.log("token:", token);

    // Check if the token was provided by the user
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized - No token provided" });
    }

    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized - Invalid Token" });
    }
    // Find the user in the database based on the decoded token's userId
    const user = await User.findById(decoded.userId).select("-password");
    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }
    // Attach the user object to the request object so it can be used in subsequent middleware or route handler
    req.user = user;
    // Call the next middleware function or the route handler
    next();
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = productRoute;
