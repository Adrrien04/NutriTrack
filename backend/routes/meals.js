const express = require('express');
const router = express.Router();
const { getMeals, addMeal } = require('../controllers/mealsController');

router.get('/', getMeals);
router.post('/', addMeal);

module.exports = router;
