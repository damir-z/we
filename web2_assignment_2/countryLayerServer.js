require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public', 'assignment_2')));

const URL = 'https://manage.countrylayer.com';

const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'assignment_2', 'countryLayer.html' ));
})

app.get('/country', async (req, res) => {
    
})


app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
})

