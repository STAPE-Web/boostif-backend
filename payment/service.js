const dotenv = require('dotenv');
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

class PayController {
    async pay(req, res) {
        try {
            const { price } = req.body
            const params = `?price=${price / 100}`

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/success${params}`,
                cancel_url: `${process.env.CLIENT_URL}/`,
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `100 items`,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                }],
            });

            res.send({ session: session });
        } catch (e) {
            res.send(e)
        }
    }
}

module.exports = new PayController()