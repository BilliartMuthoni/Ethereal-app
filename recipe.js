document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3001/recipes');
    const recipes = await response.json();
    const recipeList = document.getElementById('recipe-list');

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.innerHTML = `
            <h3>${recipe.recipe_name}</h3>
            <p>Owner: ${recipe.recipe_owner}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <img src="${recipe.recipe_image_url}" alt="${recipe.recipe_name}">
        `;
        recipeList.appendChild(recipeItem);
    });
});
