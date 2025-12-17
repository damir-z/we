// const http = require("http");
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type' : 'text/html; charset = utf-8'}) 

//     const stream = fs.createReadStream('./html/index.html');
//     stream.pipe(res);
// })

// const PORT = 3000;
// const HOST = 'localhost';

// server.listen(PORT, HOST, () => {
//     console.log(`Server running on http://${HOST}:${PORT}`)
// })




const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));
app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) =>{
    res.render('index', {bmi : null})
})

app.post('/', (req, res) => {
    console.log('Ready');

    const height = req.body.height;
    const weight = (req.body.weight) / 100;

    const bmi = weight / (height * height);

    let category = "";

    if(bmi < 18.5){
        category += "Underweight";
    }else if(bmi >= 18.5 && bmi < 24.9){
        category += "Normal weight";
    }else if(bmi >= 25 && bmi < 29.9){
        category += "Overweight";
    }else if(bmi >= 30){
        category += "Obese";
    }
    res.render('index', {bmi, category});
})

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
})


