document.addEventListener('DOMContentLoaded', () => {
    // récupération des éléments du formulaire et du tableau
    const mealForm = document.getElementById('mealForm');
    const objectiveForm = document.getElementById('objectiveForm');
    const mealsTableBody = document.getElementById('mealsTableBody');

    // récupération des éléments pour afficher les sommes des nutriments
    const sumCaloriesElement = document.getElementById('sumCalories');
    const sumProteinesElement = document.getElementById('sumProteines');
    const sumGlucidesElement = document.getElementById('sumGlucides');
    const sumLipidesElement = document.getElementById('sumLipides');

    // éléments pour afficher la comparaison avec les objectifs
    const compareCaloriesElement = document.getElementById('compareCalories');
    const compareProteinesElement = document.getElementById('compareProteines');
    const compareGlucidesElement = document.getElementById('compareGlucides');
    const compareLipidesElement = document.getElementById('compareLipides');

    // éléments pour afficher les objectifs
    const objectiveCaloriesDisplay = document.getElementById('objectiveCaloriesDisplay');
    const objectiveProteinesDisplay = document.getElementById('objectiveProteinesDisplay');
    const objectiveGlucidesDisplay = document.getElementById('objectiveGlucidesDisplay');
    const objectiveLipidesDisplay = document.getElementById('objectiveLipidesDisplay');

    // éléments des barres de progression
    const progressCalories = document.getElementById('progressCalories');
    const progressProteines = document.getElementById('progressProteines');
    const progressGlucides = document.getElementById('progressGlucides');
    const progressLipides = document.getElementById('progressLipides');

    // éléments affichant les objectifs actuels
    const currentObjectives = document.getElementById('currentObjectives');
    const currentCalories = document.getElementById('currentCalories');
    const currentProteines = document.getElementById('currentProteines');
    const currentGlucides = document.getElementById('currentGlucides');
    const currentLipides = document.getElementById('currentLipides');

    // Sélection des boutons de tri
    const sortByProteinBtn = document.getElementById('sortByProtein');
    const sortByGlucideBtn = document.getElementById('sortByGlucide');
    const sortByLipideBtn = document.getElementById('sortByLipide');
    const sortByCalorieBtn = document.getElementById('sortByCalorie');

    // Ajout des événements de clic
    sortByProteinBtn.addEventListener('click', () => fetchSortedMeals('protein'));
    sortByGlucideBtn.addEventListener('click', () => fetchSortedMeals('glucide'));
    sortByLipideBtn.addEventListener('click', () => fetchSortedMeals('lipide'));
    sortByCalorieBtn.addEventListener('click', () => fetchSortedMeals('calorie'));

    // ajout d'un événement au formulaire de repas
    mealForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // récupération des inputs pour un repas
        const nomInput = document.getElementById('nom');
        const caloriesInput = document.getElementById('calories');
        const proteinesInput = document.getElementById('proteines');
        const glucidesInput = document.getElementById('glucides');
        const lipidesInput = document.getElementById('lipides');

        // vérification si tous les champs sont remplis
        if (!nomInput || !caloriesInput || !proteinesInput || !glucidesInput || !lipidesInput) {
            alert("Une erreur est survenue, vérifiez votre formulaire.");
            return;
        }

        // création d'un objet repas
        const meal = {
            nom: nomInput.value,
            calories: parseInt(caloriesInput.value) || 0,
            proteines: parseInt(proteinesInput.value) || 0,
            glucides: parseInt(glucidesInput.value) || 0,
            lipides: parseInt(lipidesInput.value) || 0,
            user: 'user1',
            createdAt: new Date()
        };

        try {
            // envoi de la requête pour ajouter un repas
            const response = await fetch('http://localhost:3000/meals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(meal),
            });

            if (response.ok) {
                alert('Meal added successfully!');
                mealForm.reset();
                fetchMeals();  // met à jour la liste des repas
                fetchSumNutrients();  // met à jour la somme des nutriments
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

    // ajout d'un événement au formulaire d'objectifs
    objectiveForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // récupération des objectifs
        const calories = document.getElementById('objectiveCalories').value;
        const proteines = document.getElementById('objectiveProteines').value;
        const glucides = document.getElementById('objectiveGlucides').value;
        const lipides = document.getElementById('objectiveLipides').value;

        // création d'un objet objectif
        const objective = {
            calories: parseInt(calories) || 0,
            proteines: parseInt(proteines) || 0,
            glucides: parseInt(glucides) || 0,
            lipides: parseInt(lipides) || 0
        };

        try {
            // envoi de la requête pour définir les objectifs
            const response = await fetch('http://localhost:3000/objectives/user1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objective),
            });

            if (response.ok) {
                alert('Objectives set successfully!');
                objectiveForm.reset();
                fetchObjectives();  // met à jour les objectifs
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert('Failed to set objectives: ' + (errorData.message || "Unknown error"));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error setting objectives: ' + error.message);
        }
    });

    // fonction pour récupérer les repas
    async function fetchMeals() {
        try {
            const response = await fetch('http://localhost:3000/meals/user1');
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
                <td>${new Date(meal.createdAt).toLocaleDateString('fr-FR')}</td>
            `;
                mealsTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching meals:', error);
            alert('Error loading meals.');
        }
    }

    // fonction pour récupérer les objectifs
    async function fetchObjectives() {
        try {
            const response = await fetch('http://localhost:3000/objectives/user1');
            if (!response.ok) throw new Error("Failed to fetch objectives");

            const objective = await response.json();
            if (objective) {
                currentCalories.textContent = objective.calories;
                currentProteines.textContent = objective.proteines;
                currentGlucides.textContent = objective.glucides;
                currentLipides.textContent = objective.lipides;
                currentObjectives.style.display = 'block';
            } else {
                currentObjectives.style.display = 'none';
            }
            return objective;
        } catch (error) {
            console.error('Error fetching objectives:', error);
            alert('Error loading objectives.');
            return null;
        }
    }

    // fonction pour récupérer la somme des nutriments
    async function fetchSumNutrients() {
        try {
            const response = await fetch('http://localhost:3000/meals/user1/sumNutrients');
            if (!response.ok) throw new Error("Failed to fetch nutrient summary");

            const { sumCalories, sumProteines, sumGlucides, sumLipides } = await response.json();
            sumCaloriesElement.textContent = sumCalories || 0;
            sumProteinesElement.textContent = sumProteines || 0;
            sumGlucidesElement.textContent = sumGlucides || 0;
            sumLipidesElement.textContent = sumLipides || 0;

            const objective = await fetchObjectives();
            if (objective) {
                updateProgressBars(sumCalories, sumProteines, sumGlucides, sumLipides, objective);
                updateComparison(sumCalories, sumProteines, sumGlucides, sumLipides, objective);
            }
        } catch (error) {
            console.error('Error fetching sum of nutrients:', error);
            alert('Error loading nutritional summary.');
        }
    }

    // fonction pour mettre à jour les barres de progression
    function updateProgressBars(sumCalories, sumProteines, sumGlucides, sumLipides, objective) {
        const updateProgressBar = (element, sum, objective) => {
            const percentage = Math.min((sum / objective) * 100, 100);
            element.style.width = `${percentage}%`;
            element.setAttribute('aria-valuenow', percentage);
            element.textContent = `${Math.round(percentage)}%`;

            if (sum > objective) {
                element.classList.add('bg-danger');
                element.textContent += ` (+${sum - objective})`;
            } else {
                element.classList.remove('bg-danger');
            }
        };

        updateProgressBar(progressCalories, sumCalories, objective.calories);
        updateProgressBar(progressProteines, sumProteines, objective.proteines);
        updateProgressBar(progressGlucides, sumGlucides, objective.glucides);
        updateProgressBar(progressLipides, sumLipides, objective.lipides);
    }

    // fonction pour mettre à jour la comparaison avec les objectifs
    function updateComparison(sumCalories, sumProteines, sumGlucides, sumLipides, objective) {
        compareCaloriesElement.textContent = sumCalories;
        compareProteinesElement.textContent = sumProteines;
        compareGlucidesElement.textContent = sumGlucides;
        compareLipidesElement.textContent = sumLipides;

        objectiveCaloriesDisplay.textContent = objective.calories;
        objectiveProteinesDisplay.textContent = objective.proteines;
        objectiveGlucidesDisplay.textContent = objective.glucides;
        objectiveLipidesDisplay.textContent = objective.lipides;
    }

    // fonction pour récupérer les repas triés
    async function fetchSortedMeals(criteria) {
        let url;
        switch (criteria) {
            case 'protein':
                url = 'http://localhost:3000/meals/user1/sortedByProtein';
                break;
            case 'glucide':
                url = 'http://localhost:3000/meals/user1/sortedByGlucide';
                break;
            case 'lipide':
                url = 'http://localhost:3000/meals/user1/sortedByLipide';
                break;
            case 'calorie':
                url = 'http://localhost:3000/meals/user1/sortedByCalorie';
                break;
            default:
                return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch sorted meals");

            const meals = await response.json();
            mealsTableBody.innerHTML = '';  // Vide d'abord la table
            meals.forEach(meal => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${meal.nom}</td>
                <td>${meal.calories}</td>
                <td>${meal.proteines}</td>
                <td>${meal.glucides}</td>
                <td>${meal.lipides}</td>
                <td>${new Date(meal.createdAt).toLocaleDateString('fr-FR')}</td>
            `;
                mealsTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching sorted meals:', error);
            alert('Error loading sorted meals.');
        }
    }


    // gestion des sections affichées
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

    // affichage de la première section
    dashboardSection.style.display = 'block';
    repasSection.style.display = 'none';
    objectifSection.style.display = 'none';

    // récupération des données
    fetchMeals();
    fetchSumNutrients();
    fetchObjectives();
});
