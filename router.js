const { Router } = require("express")
const AuthService = require("./auth/auth.service.js")
const userService = require("./user/user.service.js")

const router = new Router()

router.post('/login', AuthService.login)
router.post('/google', AuthService.google)
router.get('/oauth', AuthService.oauth)
router.post('/register', AuthService.register)
router.get('/user/get', userService.get)
router.delete('/user/delete', userService.detele)
router.post('/user/update', userService.update)

module.exports = router