const ItemController = require('./item.controller.js')

class ItemService {
    async get(req, res) {
        await ItemController.get(req, res)
    }
    async getOne(req, res) {
        await ItemController.getOne(req, res)
    }
    async create(req, res) {
        await ItemController.create(req, res)
    }
    async delete(req, res) {
        await ItemController.delete(req, res)
    }
    async update(req, res) {
        await ItemController.update(req, res)
    }
}

module.exports = new ItemService();