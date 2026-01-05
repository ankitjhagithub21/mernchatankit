const User = require("../models/userModel"); 

const getCurrentUser = async (req, res) => {
  try {
    
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.userId;

    const users = await User.find(
      { _id: { $ne: loggedInUserId } },
      "fullname"
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


module.exports = { getCurrentUser , getAllUsers};
