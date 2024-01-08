const GameModule = require("./game.module.js");

class GameController {
    async get(req, res) {
        try {
            const data = await GameModule.get()

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.query
            const data = await GameModule.getById(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, data } = req.body
            const response = await GameModule.update(id, data)

            res.json(response)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new GameController()