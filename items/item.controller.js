const ItemModule = require("./item.module.js");

class ItemController {
    async get(req, res) {
        try {
            const gameId = req.query['gameId']
            const data = await ItemModule.get(gameId)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const serviceId = req.query['serviceId']
            const data = await ItemModule.getById(serviceId)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, name, description, price, image } = req.body
            console.log(id, name, description, price, image)
            const data = await ItemModule.update(id, name, description, price, image)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            const { name, price, details, game, image, requirements, description } = req.body
            const itemData = { name, price, details, game, image, requirements, description }
            const data = await ItemModule.create(itemData)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query
            const data = await ItemModule.delete(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ItemController()