const { default: axios } = require("axios")
const { db, timestamp } = require("../firebase.js")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

class AuthModule {
    async getUserFromEmail(email) {
        const ref = db.collection('users')
        const snapshot = await ref.where("email", "==", email).get()
        let result;

        snapshot.forEach(doc => {
            result = {
                id: doc.id,
                data: doc.data()
            }
        });

        return result
    }

    async login(email, password) {
        let result = await this.getUserFromEmail(email)
        let message;

        const res = await bcrypt.compare(password, result.data.password);
        if (res) {
            message = {
                ok: true,
                id: result.id
            }
        } else {
            message = {
                ok: false,
                message: "Wrong password"
            }
        }

        return message;
    }

    async admin(login, password) {
        // wh2G$5343/d=
        const adminData = await db.collection("admin").doc("admin").get()
        return adminData.data().login === login && adminData.data().password === password
    }

    async register(email, password, username) {
        const docId = uuid.v4()
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        let message;

        let result = await this.getUserFromEmail(email)

        if (email !== result?.data?.email) {
            await db.collection('users').doc(docId).set({
                dateCreate: timestamp,
                email: email,
                orderItems: [],
                password: hash,
                passwordSalt: salt,
                username: username
            }).then(() => {
                message = {
                    ok: true,
                    id: docId
                }
            }).catch(err => {
                message = {
                    ok: false,
                    message: err
                }
            })
        } else {
            message = {
                ok: false,
                message: "This user already exists"
            }
        }

        return message;
    }

    async oauth(access_token) {
        const response = await axios.post(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
        return response.data
    }
}

module.exports = new AuthModule()