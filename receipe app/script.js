document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    const getRecipes = () => {
        return JSON.parse(localStorage.getItem('recipes')) || [];
    };

    const saveRecipes = (recipes) => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    };

    const renderRecipes = () => {
        recipeList.innerHTML = '';
        const recipes = getRecipes();
        recipes.forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p><strong>Ingredients:</strong></p>
                <p>${recipe.ingredients}</p>
                <p><strong>Steps:</strong></p>
                <p>${recipe.steps}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;
            recipeList.appendChild(recipeDiv);
        });
    };

    const addRecipe = (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const ingredients = document.getElementById('ingredients').value;
        const steps = document.getElementById('steps').value;
        const image = document.getElementById('image').value;

        const recipes = getRecipes();
        recipes.push({ name, ingredients, steps, image });
        saveRecipes(recipes);
        renderRecipes();

        recipeForm.reset();
    };

    window.editRecipe = (index) => {
        const recipes = getRecipes();
        const recipe = recipes[index];
        document.getElementById('name').value = recipe.name;
        document.getElementById('ingredients').value = recipe.ingredients;
        document.getElementById('steps').value = recipe.steps;
        document.getElementById('image').value = recipe.image;
        document.getElementById('recipe-form').onsubmit = (event) => {
            event.preventDefault();
            recipes[index] = {
                name: document.getElementById('name').value,
                ingredients: document.getElementById('ingredients').value,
                steps: document.getElementById('steps').value,
                image: document.getElementById('image').value
            };
            saveRecipes(recipes);
            renderRecipes();
            recipeForm.onsubmit = addRecipe;
            recipeForm.reset();
        };
    };

    window.deleteRecipe = (index) => {
        const recipes = getRecipes();
        recipes.splice(index, 1);
        saveRecipes(recipes);
        renderRecipes();
    };

    recipeForm.onsubmit = addRecipe;
    renderRecipes();
});
