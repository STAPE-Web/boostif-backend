const UserModule = require("./user.module.js");

class UserController {
    async get(req, res) {
        try {
            const id = req.query['uid']
            const data = await UserModule.getById(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { userId, username } = await req.body;
            console.log(req.body)
            const data = await UserModule.update(userId, {
                username: username
            })

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const id = req.query['uid']
            const data = await UserModule.delete(id)

            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()