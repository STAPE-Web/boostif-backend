const AuthController = require('./auth.controller.js')

class AuthService {
    async login(req, res) {
        await AuthController.login(req, res)
    }

    async register(req, res) {
        await AuthController.register(req, res)
    }

    async oauth(req, res) {
        await AuthController.oauth(req, res)
    }

    async google(req, res) {
        await AuthController.google(req, res)
    }

    async admin(req, res) {
        await AuthController.admin(req, res)
    }
}

module.exports = new AuthService();