const upload = require('../config/multer')
const { getCurrentUser, getAllUsers, updateUserProfile } = require('../controllers/userController')
const isAuth = require('../middlewares/isAuth')

const router = require('express').Router()

router.get("/current", isAuth, getCurrentUser)
router.get("/", isAuth,getAllUsers)
router.put("/update", isAuth, upload.single('avatar') ,updateUserProfile)

module.exports = router