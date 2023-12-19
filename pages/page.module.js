const { db, timestamp } = require("../firebase.js")

class ItemModule {
    async getById(id) {
        const ref = db.collection('pages').doc(id)
        const data = await ref.get()
        return {
            id: data.id,
            data: data.data()
        }
    }

    async update(id, html) {
        const ref = db.collection('pages').doc(id)
        await ref.update({
            id, html
        })
        return true
    }
}

module.exports = new ItemModule()