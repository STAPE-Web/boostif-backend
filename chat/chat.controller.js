const ChatModule = require("./chat.module.js");

class ChatController {
    async get(req, res) {
        try {
            const session = req.query['session']
            const data = await ChatModule.get(session)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async message(req, res) {
        try {
            const { messageData, session } = await req.body;
            const data = await ChatModule.message(messageData, session)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ChatController()