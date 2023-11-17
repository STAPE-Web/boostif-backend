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

    async get(type) {
        let data = []
        const ref = db.collection('games').where("type", "==", type)
        const snapshot = await ref.orderBy("timestamp", "desc").get();
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

    async create(title, price, type) {
        const ref = db.collection('games')
        await ref.add({ title, price, timestamp, type })
        return true
    }

    async delete(id) {
        const ref = db.collection('games').doc(id)
        await ref.delete()
        return true
    }

    async update(id, title, price) {
        const ref = db.collection('games').doc(id)
        await ref.update({
            title, price
        })
        return true
    }
}

module.exports = new GameModule()