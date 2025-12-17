// const path = require('path');

// console.log("Hello there!WWW");

// console.log(__dirname); //absolute path to folder
// console.log(__filename); //absolute path to file

// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello from Node.js server!!!!!!!!!!!!!");
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res) => {
    // res.send('Hello, World!')
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});
        
app.get('/login', (req, res) => {
    // res.send('Hello, World!')
    res.sendFile(path.join(__dirname, 'logining ', 'login.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
