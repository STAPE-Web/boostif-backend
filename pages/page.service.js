const ItemController = require('./page.controller.js')

class ItemService {
    async getOne(req, res) {
        await ItemController.getOne(req, res)
    }
    async update(req, res) {
        await ItemController.update(req, res)
    }
}

module.exports = new ItemService();