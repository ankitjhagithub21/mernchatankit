const { getCurrentUser, getAllUsers } = require('../controllers/userController')
const isAuth = require('../middlewares/isAuth')

const router = require('express').Router()

router.get("/current", isAuth, getCurrentUser)
router.get("/", isAuth,getAllUsers)


module.exports = router