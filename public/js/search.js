const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');


searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    
    if (query === '') {
    // If the input is empty, clear the search results
    searchResults.innerHTML = '';
    return;
    }

    try {
    const response = await fetch(`/find-recipe?query=${query}`);
    const recipes = await response.json();

    searchResults.innerHTML = ''; // Clear previous results
    recipes.forEach(recipe => {
        const recipeEl = document.createElement('a');
        recipeEl.setAttribute('href', `/recipe/${recipe.id}`); // Display user name, adjust as needed
        recipeEl.textContent = recipe.recipe_name;
        searchResults.appendChild(recipeEl);
    });
    } catch (error) {
    console.error('Error fetching search results:', error);
    }
});