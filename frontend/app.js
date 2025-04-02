document.addEventListener('DOMContentLoaded', () => {
    const mealForm = document.getElementById('mealForm');
    const mealsTableBody = document.getElementById('mealsTableBody');
    const sumCaloriesElement = document.getElementById('sumCalories');
    const sumProteinesElement = document.getElementById('sumProteines');
    const sumGlucidesElement = document.getElementById('sumGlucides');
    const sumLipidesElement = document.getElementById('sumLipides');

    mealForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nomInput = document.getElementById('nom');
        const caloriesInput = document.getElementById('calories');
        const proteinesInput = document.getElementById('proteines');
        const glucidesInput = document.getElementById('glucides');
        const lipidesInput = document.getElementById('lipides');

        if (!nomInput || !caloriesInput || !proteinesInput || !glucidesInput || !lipidesInput) {
            alert("Une erreur est survenue, vérifiez votre formulaire.");
            return;
        }

        const meal = {
            nom: nomInput.value,
            calories: parseInt(caloriesInput.value) || 0,
            proteines: parseInt(proteinesInput.value) || 0,
            glucides: parseInt(glucidesInput.value) || 0,
            lipides: parseInt(lipidesInput.value) || 0,
        };

        try {
            const response = await fetch('http://localhost:3000/meals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(meal),
            });

            if (response.ok) {
                alert('Meal added successfully!');
                mealForm.reset();
                fetchMeals();
                fetchSumNutrients();
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert('Failed to add meal: ' + (errorData.message || "Unknown error"));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding meal: ' + error.message);
        }
    });

    async function fetchMeals() {
        try {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) throw new Error("Failed to fetch meals");

            const meals = await response.json();
            mealsTableBody.innerHTML = '';
            meals.forEach(meal => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${meal.nom}</td>
                    <td>${meal.calories}</td>
                    <td>${meal.proteines}</td>
                    <td>${meal.glucides}</td>
                    <td>${meal.lipides}</td>
                `;
                mealsTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching meals:', error);
            alert('Error loading meals.');
        }
    }

    async function fetchSumNutrients() {
        try {
            const response = await fetch('http://localhost:3000/meals/sumNutrients');
            if (!response.ok) throw new Error("Failed to fetch nutrient summary");

            const { sumCalories, sumProteines, sumGlucides, sumLipides } = await response.json();
            sumCaloriesElement.textContent = sumCalories || 0;
            sumProteinesElement.textContent = sumProteines || 0;
            sumGlucidesElement.textContent = sumGlucides || 0;
            sumLipidesElement.textContent = sumLipides || 0;
        } catch (error) {
            console.error('Error fetching sum of nutrients:', error);
            alert('Error loading nutritional summary.');
        }
    }

    const dashboardLink = document.getElementById('dashboardLink');
    const repasLink = document.getElementById('repasLink');
    const objectifLink = document.getElementById('objectifLink');

    const dashboardSection = document.getElementById('dashboardSection');
    const repasSection = document.getElementById('repasSection');
    const objectifSection = document.getElementById('objectifSection');

    dashboardLink.addEventListener('click', () => {
        dashboardSection.style.display = 'block';
        repasSection.style.display = 'none';
        objectifSection.style.display = 'none';
    });

    repasLink.addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        repasSection.style.display = 'block';
        objectifSection.style.display = 'none';
    });

    objectifLink.addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        repasSection.style.display = 'none';
        objectifSection.style.display = 'block';
    });

    // Default to showing the dashboard section
    dashboardSection.style.display = 'block';
    repasSection.style.display = 'none';
    objectifSection.style.display = 'none';

    fetchMeals();
    fetchSumNutrients();
});
