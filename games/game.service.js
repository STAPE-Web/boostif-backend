const GameController = require('./game.controller.js')

class GameService {
    async get(req, res) {
        await GameController.get(req, res)
    }
    async getOne(req, res) {
        await GameController.getOne(req, res)
    }
    async create(req, res) {
        await GameController.create(req, res)
    }
    async delete(req, res) {
        await GameController.delete(req, res)
    }
    async update(req, res) {
        await GameController.update(req, res)
    }
}

module.exports = new GameService();