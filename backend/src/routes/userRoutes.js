const { getCurrentUser } = require('../controllers/userController')
const isAuth = require('../middlewares/isAuth')

const router = require('express').Router()

router.get("/current", isAuth, getCurrentUser)


module.exports = router