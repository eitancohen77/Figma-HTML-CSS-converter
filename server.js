const express = require('express');
const realData= require('./realData.json');
const path = require('path');
require('dotenv').config();

const app = express();
const TOKEN_KEY = process.env.TOKEN_KEY;

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render ('index', { realData})
});

app.get('/getFigma', async(req, res) => {
    // The actual method:
    // const url = "https://api.figma.com/v1/files/Hh3OjDglRPLNSzivcNWD0a";
    // try {
    //     const response = await fetch(url, {
    //         headers: {
    //             'X-Figma-Token': TOKEN_KEY
    //         }
    //     })

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! ${response.status}`)
    //     }

    //     const data = await response.json()
    //     res.json(data);
    // } catch(err) {
    //     console.error(err.message);
    //     res.status(500).json({ error: 'Failed to fetch Figma file' });
    // }

    // Fake fetch method to perserve API usage.
})

app.listen(3000, ()=> {
    console.log('Server is runnning on http://localhost:3000');
})