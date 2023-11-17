const axios = require('axios');

const clientId = '228792432';
const clientSecret = 'YOUR_CLIENT_SECRET';

class Payment {
    async getAccessToken() {
        const response = await axios.post('https://api.skrill.com/v1/oauth2/token', {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials',
        });

        const { access_token } = response.data;
        console.log(access_token)
        // return access_token;
    }
}

module.exports = new Payment()