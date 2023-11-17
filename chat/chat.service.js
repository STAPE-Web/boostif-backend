const ChatController = require('./chat.controller.js')

class ChatService {
    async get(req, res) {
        await ChatController.get(req, res)
    }

    async message(req, res) {
        await ChatController.message(req, res)
    }
}

module.exports = new ChatService();