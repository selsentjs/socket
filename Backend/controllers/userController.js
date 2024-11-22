const User = require("../Model/User");

// get all users
const getAllUsersSidebar = async (req, res) => {
  const loggedInUserId = req.user._id;

  try {
    // return all the users details but not loggedIn user details
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  getAllUsersSidebar,
};
