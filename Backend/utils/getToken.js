const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: '2d' 
      
 })
 res.cookie("jwt", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000, 
    // helps prevent cross-site scripting (XSS) attacks
    httpOnly: true, // prevent XSS attacks
    //Cross-Site Request Forgery (CSRF) Protection: Setting sameSite: "strict" ensures that the cookie will only be sent in requests originating from the same origin as the domain
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
 })
}

module.exports = generateTokenAndSetCookie;