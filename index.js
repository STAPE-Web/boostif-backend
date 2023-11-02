const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const dotenv = require('dotenv')

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log("Server start");
})