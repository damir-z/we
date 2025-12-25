require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'public', 'assignment_2')));

const userURL = 'https://randomuser.me/api/';


//HTML location
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'assignment_2', 'random_user.html'));
})



//Response to Frontend
app.get('/generate', async (req, res) => {
    try{


        const response = await axios.get(userURL);
        const user = response.data.results[0];
        const countryName = user.location.country;

        const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
        const countryInfo = countryResponse?.data[0];
        if(!countryInfo){
            throw new Error("Country not Found...");
        }



        const currencyCode = Object.keys(countryInfo.currencies)[0];
        const currencyExchangeResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API}/latest/${currencyCode}`);
        const currencyInfo = currencyExchangeResponse.data;

        const newsResponse = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                apiKey: process.env.NEWS_API,
                q: 'us',
                pageSize: 5
            }
        });
        const newsInfo = newsResponse.data.articles[0];
        
    

        res.json({
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            dateOfBirth: user.dob.date,
            city: user.location.city,
            location: user.location,
            profilePicture: user.picture.medium,

            country: user.location.country,
            capital: countryInfo.capital?.[0],
            language: Object.values(countryInfo.languages)?.[0],
            flag: countryInfo.flags?.png,

            currency: Object.values(countryInfo.currencies)?.[0].name,
            currentCurrencyCode: Object.keys(countryInfo.currencies)[0],
            usdValue: currencyInfo.conversion_rates.USD,
            kztValue: currencyInfo.conversion_rates.KZT,


            newsHeadline: newsInfo.title,
            newsDescription: newsInfo.description, 
            newsURL: newsInfo.url, 
            newsImage: newsInfo.urlToImage
        });
    }catch(error){
        res.status(500).json({error: "500 Server error..."});
    }
})

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
})


