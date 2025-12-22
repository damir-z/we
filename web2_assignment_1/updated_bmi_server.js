const express = require('express');

const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '..', 'public', 'assignment_1')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'assignment_1','interface.html'));
})

app.post('/bmi', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    if (!height || !weight || height <= 0 || weight <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    
    const bmi = weight / (height * height);
    const category = bmi < 18.5 ? "Underweight" : "Normal";

    res.json({
        bmi: bmi.toFixed(2),
        category: category
    });
});

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`);
})
