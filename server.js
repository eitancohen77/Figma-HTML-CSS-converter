const express = require('express');
const mockData= require('./mockData.json');
const path = require('path');
require('dotenv').config();

const app = express();
const TOKEN_KEY = process.env.TOKEN_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async(req, res) => {
    try {
        //const resposne = await fetch('http://localhost:3000/getFigma');
        //const mockData = await resposne.json();

        res.render ('index', { mockData})
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Failed to load Figma data")
    }
});

app.get('/input', (req, res) => {
    res.render('input')
})

app.get('/getFigma:id', async(req, res) => {
    const fileId = req.params.id;
    const url = `https://api.figma.com/v1/files/${fileId}`;
    try {
        const response = await fetch(url, {
            headers: {
                'X-Figma-Token': TOKEN_KEY
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`)
        }

        const data = await response.json()
        res.json(data);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch Figma file' });
    }
})

app.post('/loadFigma', async (req, res) => {
    const figmaId = req.body.figmaId;

    try {
        const response = await fetch(`http://localhost:3000/getFigma/${figmaId}`);
        const figmaData = await response.json();

        res.render('index', { mockData: figmaData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Failed to load Figma data");
    }
});

app.listen(3000, ()=> {
    console.log('Server is runnning on http://localhost:3000');
})