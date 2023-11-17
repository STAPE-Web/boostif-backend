const GameModule = require("./game.module.js");

class GameController {
    async get(req, res) {
        try {
            const game = req.query['game']
            const data = await GameModule.get(type)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const id = req.query['id']
            const data = await GameModule.getById(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            const { title, price, type } = req.body
            const data = await GameModule.create(title, price, type)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const id = req.query['id']
            const data = await GameModule.delete(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, title, price } = req.body
            const data = await GameModule.update(id, title, price)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new GameController()