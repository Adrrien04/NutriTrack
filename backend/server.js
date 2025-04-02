const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('NutriTrack API');
});

const mealsRouter = require('./routes/meals');
app.use('/meals', mealsRouter);

app.listen(PORT, () => {
    console.log(`port ${PORT}`);
});

