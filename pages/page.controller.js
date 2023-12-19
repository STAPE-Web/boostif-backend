const ItemModule = require("./page.module.js");

class ItemController {
    async getOne(req, res) {
        try {
            const id = req.query['id']
            const data = await ItemModule.getById(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, html } = req.body
            const data = await ItemModule.update(id, html)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ItemController()