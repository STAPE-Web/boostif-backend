const { db, timestamp } = require("../firebase")
const TelegramBot = require('node-telegram-bot-api');

async function CreateOrder(req, res) {
    const data = req.body

    const ref = db.collection('orders')
    const result = await ref.add({ ...data, timestamp })
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

async function GetOrder(req, res) {
    const { id } = req.query

    let data = []
    const ref = db.collection('orders').where("userId", "==", id)
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

    res.json(data)
}

module.exports = { CreateOrder, GetOrder }