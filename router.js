const { Router } = require("express")
const AuthService = require("./auth/auth.service.js")
const userService = require("./user/user.service.js")
const chatService = require("./chat/chat.service.js")
const Payment = require("./payment/service.js")
const gameService = require("./games/game.service.js")
const itemService = require("./items/item.service.js")
const pageService = require("./pages/page.service.js")
const { CreateOrder, GetOrder } = require("./order/controller.js")

const router = new Router()

router.post('/login', AuthService.login)
router.post('/google', AuthService.google)
router.get('/oauth', AuthService.oauth)
router.post('/register', AuthService.register)
router.post('/login/admin', AuthService.admin)

router.get('/user/get', userService.get)
router.delete('/user/delete', userService.detele)
router.post('/user/update', userService.update)

router.get('/chat/get', chatService.get)
router.post('/chat/message', chatService.message)

router.post('/payment', Payment.pay)

router.get('/games', gameService.get)
router.get('/games/get', gameService.getOne)
router.post('/games/create', gameService.create)
router.delete('/games/delete', gameService.delete)
router.put('/games/update', gameService.update)

router.get('/items', itemService.get)
router.get('/items/get', itemService.getOne)
router.post('/items/create', itemService.create)
router.delete('/items/delete', itemService.delete)
router.put('/items/update', itemService.update)

router.get('/pages/get', pageService.getOne)
router.put('/pages/update', pageService.update)

router.post('/createOrder', CreateOrder)
router.get('/getOrder', GetOrder)

module.exports = router