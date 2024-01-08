const { db, timestamp } = require("../firebase.js")

class ItemModule {
    async getById(uid) {
        const ref = db.collection('items').doc(uid)
        const data = await ref.get()
        return {
            id: data.id,
            data: data.data()
        }
    }

    async get(gameId) {
        let data = []
        const ref = db.collection('items').where("game", "==", gameId)
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

    async update(id, name, description, price, oldPrice, image, additionalData) {
        const ref = db.collection('items').doc(id)
        await ref.update({
            name, price, oldPrice, image, description, ...additionalData
        })
        return true
    }

    async create(itemData) {
        const ref = db.collection('items')
        const res = await ref.add(itemData)
        return res
    }

    async delete(id) {
        console.log(id)
        const ref = db.collection('items').doc(id)
        const res = await ref.delete()
        return res
    }
}

module.exports = new ItemModule()