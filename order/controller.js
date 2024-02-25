const { db } = require("../firebase")
const TelegramBot = require('node-telegram-bot-api');

module.exports = async function CreateOrder(req, res) {
    const data = req.body

    const ref = db.collection('orders')
    const result = await ref.add(data)
    const url = `${process.env.CLIENT_URL}/item/${data.id}`

    const bot = new TelegramBot("6668837839:AAFMT4xoJhw-NmrkEld5-d86q7UnCEcgZwA");
    await bot.sendMessage(-4144508464, `*New Order:*
*Service:* ${url}
*Title:* ${data.title}
*Contact:* ${data.userData}
*Price:* $${Number(data.price) / data.count}
*Count:* ${data.count}
*Additional:* ${data.description}`, { parse_mode: "Markdown" })

    res.json(result.id)
}