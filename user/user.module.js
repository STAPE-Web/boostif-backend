const { db } = require("../firebase.js")

class UserModule {
    async update(userId, data) {
        try {
            const ref = db.collection('users').doc(userId);
            await ref.update(data)
            return {
                ok: true,
                message: "Information has been updated"
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false,
                message: "Information has been updated"
            }
        }
    }

    async delete(userId) {
        try {
            const ref = db.collection('users').doc(userId);
            await ref.delete()
            return {
                ok: true,
                message: "User was been deleted"
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false,
                message: "User not deleted"
            }
        }
    }

    async getById(uid) {
        const ref = db.collection('users').doc(uid)
        const data = await ref.get()
        return {
            id: data.id,
            data: data.data()
        }
    }

    async add(id, data) {
        const ref = db.collection('users').doc(id)
        await ref.set(data)
    }
}

module.exports = new UserModule()