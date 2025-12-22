// import axios from "axios";
// import dotenv from "dotenv";

require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
// const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '..', 'public', 'assignment_2')));

const URL = 'https://api.openweathermap.org/data/2.5/weather';


app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if(!city){
        return res.status(400).json({error: 'Need city'});
    }

    try{
        const response = await axios.get(URL, {
            params: {
                q: city,
                appid: process.env.OPEN_WEATHER_API_KEY,
                units: 'metric'
            }
        })

        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        });
    }catch(e){
        res.status(500).json({e: 'Weather not found'});
    }

});

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
});

