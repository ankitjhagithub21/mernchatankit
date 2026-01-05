const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { accessChat } = require("../controllers/chatController");

router.post("/", isAuth, accessChat);

module.exports = router;
