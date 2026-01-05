const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const sendMessage = async (req, res) => {
  try {
    const { chatId, text} = req.body;
    const senderId = req.userId;

    if (!chatId || !text) {
      return res.status(400).json({
        success: false,
        message: "chatId and message content required",
      });
    }

    // 1️⃣ Create message
    let message = await Message.create({
      sender: senderId,
      chat: chatId,
      text,
      seenBy: [senderId],
    });

    // 2️⃣ Populate message
    message = await message.populate("sender", "fullname avatar");
    message = await message.populate("chat");

    // 3️⃣ Update latest message in chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "ChatId is required",
      });
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};


module.exports = { sendMessage, getMessages };
