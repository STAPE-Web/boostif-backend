const { db, timestamp } = require("../firebase.js")

class GameModule {
    async getById(uid) {
        const ref = db.collection('games').doc(uid)
        const data = await ref.get()
        return {
            id: data.id,
            data: data.data()
        }
    }

    async get() {
        let data = []
        const ref = db.collection('games')
        const snapshot = await ref.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            data = [...data, {
                id: doc.id,
                data: doc.data()
            }]
        });
        return data
    }

    async update(id, name, text) {
        const ref = db.collection('games').doc(id)
        await ref.update({
            name, text
        })
        return true
    }
}

module.exports = new GameModule()