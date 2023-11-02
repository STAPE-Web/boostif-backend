const UserController = require('./user.controller.js')

class UserService {
    async get(req, res) {
        await UserController.get(req, res)
    }

    async update(req, res) {
        await UserController.update(req, res)
    }

    async detele(req, res) {
        await UserController.delete(req, res)
    }
}

module.exports = new UserService();