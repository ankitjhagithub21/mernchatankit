const Chat = require("../models/chatModel");

const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    // 1️⃣ Check if chat already exists
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [loggedInUserId, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) {
      return res.status(200).json({
        success: true,
        chat,
      });
    }

    // 2️⃣ Create new chat
    const newChat = await Chat.create({
      isGroupChat: false,
      users: [loggedInUserId, userId],
    });

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json({
      success: true,
      chat: fullChat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to access chat",
    });
  }
};

const fetchChats = async (req, res) => {
  try {
    const userId = req.userId;

    const chats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      chats,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};

module.exports = { accessChat, fetchChats };
