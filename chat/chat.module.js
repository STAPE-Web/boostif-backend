const { db, timestamp } = require("../firebase.js")

class ChatModule {
    async get(session) {
        const ref = db.collection('chats')
        const data = await ref.where("session", "==", session).orderBy("timestamp", "asc").get()
        let result = []

        data.docs.forEach(doc => {
            result.push(doc.data())
        })

        return result
    }

    async message(messageData, session) {
        const ref = db.collection('chats')
        await ref.add({
            messageData, session, timestamp: timestamp
        })
    }
}

module.exports = new ChatModule()