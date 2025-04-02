document.addEventListener('DOMContentLoaded', () => {
    const mealForm = document.getElementById('mealForm');

    mealForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const meal = {
            name: document.getElementById('name').value,
            calories: document.getElementById('calories').value,
            protein: document.getElementById('protein').value,
            carbs: document.getElementById('carbs').value,
            fat: document.getElementById('fat').value,
        };

        try {
            const response = await fetch('http://localhost:3000/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meal),
            });

            if (response.ok) {
                alert('Repas ajouté avec succès !');
                mealForm.reset();
            } else {
                const errorData = await response.json();
                console.error('Réponse d\'erreur :', errorData);
                alert('Échec de l\'ajout du repas : ' + errorData.message);
            }
        } catch (error) {
            console.error('Erreur :', error);
            alert('Erreur lors de l\'ajout du repas : ' + error.message);
        }
    });
});
