const { timestamp } = require("../firebase.js");
const userModule = require("../user/user.module.js");
const AuthModule = require("./auth.module.js");
const { OAuth2Client } = require('google-auth-library')

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = await req.body;
            const data = await AuthModule.login(email, password)

            res.send(data)
        } catch (e) {
            console.log(e);
        }
    }

    async admin(req, res) {
        try {
            const { login, password } = await req.body;
            const data = await AuthModule.admin(login, password)

            res.send(data)
        } catch (e) {
            console.log(e);
        }
    }

    async register(req, res) {
        try {
            const { email, password, username } = await req.body;
            const data = await AuthModule.register(email, password, username)

            res.send(data)
        } catch (e) {
            console.log(e);
        }
    }

    async google(req, res) {
        try {
            const redirectUrl = `${process.env.SERVER_URL}/api/oauth`
            const oAuth2Client = new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                redirectUrl
            )

            const authorizeUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
                prompt: 'consent'
            })

            res.json({ url: authorizeUrl })
        } catch (e) {
            console.log(e)
        }
    }

    async oauth(req, res) {
        try {
            const code = req.query.code
            const redirectUrl = `${process.env.SERVER_URL}/api/oauth`
            console.log(redirectUrl)
            const oAuth2Client = new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                redirectUrl
            )

            const result = await oAuth2Client.getToken(code)
            await oAuth2Client.setCredentials(result.tokens)
            const user = oAuth2Client.credentials
            const data = await AuthModule.oauth(user.access_token)

            const getUserData = await userModule.getById(data.sub)
            if (getUserData.data === undefined) {
                userModule.add(data.sub, {
                    dateCreate: timestamp,
                    email: data.email,
                    orderItems: [],
                    authType: "Google",
                    username: data.name,
                    avatar: data.picture
                })
            }

            res.redirect(`${process.env.CLIENT_URL}/?uid=${data.sub}`)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController()