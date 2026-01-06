const User = require("../models/userModel");
const cloudinary = require("../config/cloudinary");

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
      "fullname avatar"
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

const updateUserProfile = async (req, res) => {
  try {
    const { fullname } = req.body;

    let result;

    if (req.file) {
     
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "avatars" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          stream.end(req.file.buffer);
        });
      };

      result = await uploadFromBuffer();
    }

    const updateData = { fullname };
    if (result?.secure_url) updateData.avatar = result.secure_url;

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    }).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};

module.exports = { getCurrentUser, getAllUsers, updateUserProfile };
