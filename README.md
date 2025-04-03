# Documentation de l'API NutriTrack

## Routes pour les objectifs

### `GET /user1`
- **Description** : Récupère les objectifs nutritionnels pour l'utilisateur `user1`.
- **Réponse** :
  - Statut 200 : Un objet contenant les objectifs nutritionnels (calories, protéines, glucides, lipides).
  - Statut 500 : Une erreur du serveur.

### `POST /user1`
- **Description** : Crée ou met à jour les objectifs nutritionnels pour l'utilisateur `user1`.
- **Corps de la requête** :
  - `calories` (nombre)
  - `proteines` (nombre)
  - `glucides` (nombre)
  - `lipides` (nombre)
- **Réponse** :
  - Statut 201 : L'objectif créé ou mis à jour.
  - Statut 400 : Une erreur liée à la requête.

## Routes pour les repas

### `GET /`
- **Description** : Récupère tous les repas.

### `POST /`
- **Description** : Ajoute un nouveau repas.
- **Contrôleur utilisé** : `addMeal`

### `GET /user1`
- **Description** : Récupère tous les repas pour l'utilisateur `user1`.

### `GET /user1/sortedByProtein`
- **Description** : Récupère tous les repas pour l'utilisateur `user1`, triés par la quantité de protéines.

### `GET /user1/sortedByGlucide`
- **Description** : Récupère tous les repas pour l'utilisateur `user1`, triés par la quantité de glucides.

### `GET /user1/sortedByLipide`
- **Description** : Récupère tous les repas pour l'utilisateur `user1`, triés par la quantité de lipides.

### `GET /user1/sortedByCalorie`
- **Description** : Récupère tous les repas pour l'utilisateur `user1`, triés par la quantité de calories.

### `GET /user1/sumNutrients`
- **Description** : Calcule la somme des calories, des protéines, des glucides et des lipides des repas consommés aujourd'hui par l'utilisateur `user1`.

---

## Modèles utilisés

### Objective
- `user` : Identifiant de l'utilisateur.
- `calories` : Objectif en calories.
- `proteines` : Objectif en protéines.
- `glucides` : Objectif en glucides.
- `lipides` : Objectif en lipides.

### Meal
- `user` : Identifiant de l'utilisateur.
- `calories` : Calories dans le repas.
- `proteines` : Protéines dans le repas.
- `glucides` : Glucides dans le repas.
- `lipides` : Lipides dans le repas.
- `createdAt` : Date de création du repas.

---


