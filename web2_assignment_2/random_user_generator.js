require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'public', 'assignment_2')));

const URL = 'https://randomuser.me/api/';

//HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'assignment_2', 'random_user.html'));
})

//API
app.get('/generate', async (req, res) => {
    try{
        const response = await axios.get(URL);

        const user = response.data.results[0];

        res.json({
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            dateOfBirth: user.dob.date,
            city: user.location.city,
            country: user.location.country,
            location: user.location,
            profilePicture: user.picture.medium
        });

    }catch(error){
        res.status(500).json({error: "Users are end..."});
    }
})

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
})


