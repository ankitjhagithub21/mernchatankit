const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { accessChat, fetchChats } = require("../controllers/chatController");

router.post("/", isAuth, accessChat);
router.get("/", isAuth, fetchChats);


module.exports = router;
