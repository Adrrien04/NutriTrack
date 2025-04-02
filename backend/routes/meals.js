const express = require('express');
const router = express.Router();
const { getMeals, addMeal } = require('../controllers/mealsController');
const R = require('ramda');
const Meal = require('../models/Meal');

router.get('/', getMeals);
router.post('/', addMeal);

router.get('/user1', async (req, res) => {
    try {
        const meals = await Meal.find({ user: 'user1' });
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/user1/sortedByProtein', async (req, res) => {
    try {
        const meals = await Meal.find({ user: 'user1' });
        const byProtein = R.comparator((a, b) => a.proteines > b.proteines);
        const sortedMeals = R.sort(byProtein, meals);
        res.json(sortedMeals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/user1/sumNutrients', async (req, res) => {
    try {
        const meals = await Meal.find({ user: 'user1' });
        const sumCalories = R.reduce((acc, meal) => acc + meal.calories, 0, meals);
        const sumProteines = R.reduce((acc, meal) => acc + meal.proteines, 0, meals);
        const sumLipides = R.reduce((acc, meal) => acc + meal.lipides, 0, meals);
        const sumGlucides = R.reduce((acc, meal) => acc + meal.glucides, 0, meals);

        res.json({
            sumCalories,
            sumProteines,
            sumLipides,
            sumGlucides
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
