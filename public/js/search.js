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
        const recipeResultWrapper = document.createElement('div');
        recipeResultWrapper.classList.add('recipe-result-wrapper');
        recipeResultWrapper.classList.add('fancy-border');

        searchResults.appendChild(recipeResultWrapper);

        const recipeEl = document.createElement('a');
        recipeEl.setAttribute('href', `/recipe/${recipe.id}`);
        recipeEl.textContent = recipe.recipe_name;
        recipeEl.classList.add('recipe-result-link');
        recipeResultWrapper.appendChild(recipeEl);

        const imageEl = document.createElement('img');
        imageEl.src = recipe.imageUrl;
        imageEl.alt = `${recipe.recipe_name} photo`;
        imageEl.classList.add('search-recipe-photo');
        recipeResultWrapper.appendChild(imageEl);

        const descriptionEl = document.createElement('p');
        descriptionEl.textContent = recipe.description;
        recipeResultWrapper.appendChild(descriptionEl);

        const flourishEl = document.createElement('img');
        flourishEl.src = '/img/swirl-flourish.png';
        flourishEl.alt = 'flourish character';
        flourishEl.classList.add('flourish-character');
        recipeResultWrapper.appendChild(flourishEl);

        const hasMeatEl = document.createElement('p');
        let hasMeatText = recipe.has_meat ? 'Contains meat' : 'Vegetarian';
        hasMeatEl.textContent = hasMeatText;
        recipeResultWrapper.appendChild(hasMeatEl);
    });
    } catch (error) {
    console.error('Error fetching search results:', error);
    }
});