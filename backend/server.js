const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const PORT = 3000;

connectDB();

app.use(cors({
    origin: 'http://127.0.0.1:8080'
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('NutriTrack API');
});

const mealsRouter = require('./routes/meals');
const objectivesRouter = require('./routes/objectives');
app.use('/meals', mealsRouter);
app.use('/objectives', objectivesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
