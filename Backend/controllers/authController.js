const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/getToken");

// signup / register user
const Register = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;
  // check password and confirmPassword

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "password and confirm password should match" });
  }
  // check username
  const usernameAlreadyExists = await User.findOne({ username });
  if (usernameAlreadyExists) {
    return res.status(400).json({ msg: "username already exists" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // https://avatar-placeholder.iran.liara.run/#document

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  try {
    // Create a new user
    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // before save generate token
    generateTokenAndSetCookie(newUser._id, res);
    // Save the new user
    const user = await newUser.save();

    // Respond with success
    res.status(201).json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// login
const Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ msg: "Please provide username and password" });
  }
  try {
    const user = await User.findOne({username})
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
    
    if(!user || !isPasswordCorrect) {
        return res.status(400).json({msg:"Invalid username or password"})
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ msg: "user logged in", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// logout
const Logout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting it with an empty value and maxAge to 0
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ msg: "user logout" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  Register,
  Login,
  Logout,
};
