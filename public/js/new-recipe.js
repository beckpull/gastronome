const addIngredient = (event) => {
    event.preventDefault();
    let newIngredient = `<div class="field">
    <label class="label">Ingredients</label>
<div class="control">
    <input class="input ingredient" type="text" placeholder="ingredient">
    </div>
</div>`
    document.getElementById('ingredients-container').innerHTML += newIngredient;
}

const addStep = (event) => {
    event.preventDefault();
    let newStep = `<div class="field">
    <label class="label">Instructions</label>
<div class="control">
    <input class="input instruction" type="text" placeholder="step">
    </div>
</div>`
    document.getElementById('instructions-container').innerHTML += newStep;
}

const recipeFormHandler = async (event) => {
    event.preventDefault();

    const recipeName = document.querySelector('#recipe-name').value.trim();
    const recipeDescription = document.querySelector('#recipe-description').value.trim();

    const ingredientsArray = createIngredientsArray();

    const instructionsArray = createInstructionsArray();

    if (recipeName && recipeDescription && ingredientsArray && instructionsArray) {
        const response = await fetch('/api/recipes', {
            method: 'POST', 
            body: JSON.stringify({ recipeName, recipeDescription, ingredientsArray, instructionsArray }), 
            headers: { 'Content-Type': 'application/json' },
        });

        // Would be good to redirect user to a "my recipes" page after they've submitted a new recipe, so the user can see their recipe was added. For now, I just put to redirect to the homepage.
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText);
        }
    }
};

function createIngredientsArray() {
    let ingredients = document.querySelectorAll('.ingredient');
    let ingredientsArray = [];
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsArray.push(ingredients[i].value.trim());
    }
    return ingredientsArray;
}

function createInstructionsArray() {
    let instructions = document.querySelectorAll('.instruction');
    let instructionsArray = [];
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray.push(instructions[i].value.trim());
    }
    return instructionsArray;
}


document.querySelector('.add-ingredient')
.addEventListener('click', addIngredient);

document.querySelector('.add-step')
.addEventListener('click', addStep);

document.querySelector('.share-recipe-form')
.addEventListener('submit', recipeFormHandler);