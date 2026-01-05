const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { sendMessage, getMessages } = require("../controllers/messageController");
const router = express.Router();


router.post("/", isAuth, sendMessage);
router.get("/:chatId", isAuth, getMessages)

module.exports = router;
