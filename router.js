const { Router } = require("express")
const AuthService = require("./auth/auth.service.js")
const userService = require("./user/user.service.js")
const chatService = require("./chat/chat.service.js")
const Payment = require("./payment/service.js")
const gameService = require("./games/game.service.js")

const router = new Router()

router.post('/login', AuthService.login)
router.post('/google', AuthService.google)
router.get('/oauth', AuthService.oauth)
router.post('/register', AuthService.register)

router.get('/user/get', userService.get)
router.delete('/user/delete', userService.detele)
router.post('/user/update', userService.update)

router.get('/chat/get', chatService.get)
router.post('/chat/message', chatService.message)

router.post('/payment', Payment.getAccessToken)

router.get('/games', gameService.get)
router.get('/games/get', gameService.getOne)
router.post('/games/create', gameService.create)
router.delete('/games/delete', gameService.delete)
router.put('/games/update', gameService.update)

module.exports = router