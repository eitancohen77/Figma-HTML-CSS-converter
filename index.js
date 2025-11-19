const express = require('express');
require('dotenv').config();
const mockData = require('./mockData.json');

const app = express();
const TOKEN_KEY = process.env.TOKEN_KEY;

app.get('/', (req, res) => {
    res.send("Can you hear me?");
});

function getMockData(url, token) {
    return mockData;
}

app.get('/getFigma', async(req, res) => {

    // The actual method:
    // const url = "https://api.figma.com/v1/files/B6ssHR0eiZIIn2OZMiwiq2";
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
    res.send(getMockData(url, TOKEN_KEY))
})

app.listen(3000, ()=> {
    console.log('Server is runnning on http://localhost:3000');
})