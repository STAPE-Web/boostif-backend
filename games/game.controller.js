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

    async update(req, res) {
        try {
            const { id, name, text } = req.body
            const data = await GameModule.update(id, name, text)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new GameController()