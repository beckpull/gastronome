const id = document.querySelector('#recipe-id').value.trim();

// Function to save form data to session storage
async function saveFormData() {
  try {
    sessionStorage.clear();
    const formData = new FormData(document.getElementById('recipe-form'));
    console.log(formData);
    for (const [key, value] of formData.entries()) {
      sessionStorage.setItem(key, value);
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to populate form fields with session storage data
async function populateForm(recipeData) {
  try {
    // Populate form fields with recipe data
    document.getElementById('recipe-name').value = recipeData.recipe_name;
    document.getElementById('recipe-description').value = recipeData.description;
    document.getElementById('has-meat').checked = recipeData.has_meat;

    // Populate ingredients
    const ingredientsContainer = document.getElementById('ingredients-container');
    // ingredientsContainer.innerHTML = '';
    recipeData.ingredients.forEach((ingredient) => {
      let newIngredient = document.createElement('div');
      newIngredient.innerHTML = `
          <label class="label">Ingredient</label>
          <div class="control">
            <input class="input ingredient" type="text" placeholder="Ingredient" name="ingredient" value="${ingredient}">
          </div>`;
      ingredientsContainer.appendChild(newIngredient);
    });

    // Populate instructions
    const instructionsContainer = document.getElementById('instructions-container');
    // instructionsContainer.innerHTML = '';
    recipeData.instructions.forEach((instruction) => {
      let newStep = document.createElement('div');
      newStep.innerHTML = `
          <label class="label">Instruction</label>
          <div class="control">
            <input class="input instruction" type="text" placeholder="Instruction" name="instruction" value="${instruction}">
          </div>`;
      instructionsContainer.appendChild(newStep);
    });
  } catch (error) {
    console.error(error);
  }
};

let counter = 2;
let counter2 = 2;

const addIngredient = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  await saveFormData(); // Save form data to session storage
  let newIngredient = document.createElement('div');
  newIngredient.innerHTML = `
      <label class="label">Ingredient</label>
      <div class="control">
        <input class="input ingredient" type="text" placeholder="Ingredient" name="ingredient${counter}">
      </div>`;
  document.getElementById('ingredients-container').appendChild(newIngredient);
  await populateForm(); // Populate form fields with session storage data
  counter++;
};

const addStep = async (event) => {
  event.preventDefault();
  await saveFormData();
  let newStep = document.createElement('div');
  newStep.innerHTML = `
      <label class="label">Instruction</label>
      <div class="control">
        <input class="input instruction" type="text" placeholder="Instruction" name="instruction${counter2}">
      </div>`;
  document.getElementById('instructions-container').appendChild(newStep);
  await populateForm();
  counter2++;
};

const submitForm = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get recipe ID from the hidden input field
  const id = document.querySelector('#recipe-id').value.trim();

  // Initialize FormData object
  const formData = new FormData();

  // Add image file to FormData (if selected)
  const imageFile = document.querySelector('#uploadFile').files[0];
  if (imageFile) {
    formData.append('image', imageFile);
  }

  // Add recipe details to FormData
  formData.append('recipe_name', document.getElementById('recipe-name').value.trim());
  formData.append('description', document.getElementById('recipe-description').value.trim());

  // Add the value of the "Has Meat" checkbox to FormData
  const hasMeat = document.getElementById('has-meat').checked;
  formData.append('has_meat', hasMeat);

  const nodeList = document.querySelectorAll('.ingredient');
  const ingredients = Array.from(nodeList).map(input => input.value);

  formData.append('ingredients', ingredients);

  const nodeList2 = document.querySelectorAll('.instruction');
  const instructions = Array.from(nodeList2).map(input => input.value);

  formData.append('instructions', instructions);

  try {
    const response = await fetch(`/api/recipes/update/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (response.ok) {
      document.location.replace('/my-recipes');
    } else {
      const responseData = await response.json();
      console.error('Error updating recipe:', responseData.message);
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
  }
};

const cancelUpdate = (event) => {
  event.preventDefault();
  document.location.replace('/');
}

// Add event listeners
document.querySelector('#update-btn').addEventListener('click', submitForm);
document.querySelector('#add-ingredient').addEventListener('click', addIngredient);
document.querySelector('#add-step').addEventListener('click', addStep);
document.querySelector('#cancel-btn').addEventListener('click', cancelUpdate)
