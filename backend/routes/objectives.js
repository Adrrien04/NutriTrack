const express = require('express');
const router = express.Router();
const Objective = require('../models/Objective');

router.get('/user1', async (req, res) => {
    try {
        const objective = await Objective.findOne({ user: 'user1' });
        res.json(objective);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/user1', async (req, res) => {
    const { calories, proteines, glucides, lipides } = req.body;

    try {
        let objective = await Objective.findOne({ user: 'user1' });
        if (objective) {
            objective.calories = calories;
            objective.proteines = proteines;
            objective.glucides = glucides;
            objective.lipides = lipides;
        } else {
            objective = new Objective({
                user: 'user1',
                calories,
                proteines,
                glucides,
                lipides
            });
        }
        await objective.save();
        res.status(201).json(objective);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
