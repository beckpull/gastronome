// Function to save form data to session storage
function saveFormData() {
  const formData = new FormData(document.getElementById('myForm'));
  for (const [key, value] of formData.entries()) {
    sessionStorage.setItem(key, value);
  }
}

// Function to populate form fields with session storage data
function populateForm() {
  const formData = new FormData(document.getElementById('myForm'));
  for (const [key, value] of formData.entries()) {
    const element = document.querySelector(`[name="${key}"]`);
    if (element) {
      element.value = value;
    }
  }
}

const addIngredient = (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  saveFormData(); // Save form data to session storage
  let newIngredient = `<div class="field">
    <label class="label">Ingredient</label>
    <div class="control">
      <input class="input ingredient" type="text" placeholder="Ingredient" name="ingredient">
    </div>
  </div>`;
  document.getElementById('ingredients-container').insertAdjacentHTML('beforeend', newIngredient);
  populateForm(); // Populate form fields with session storage data
};
document.querySelector('#add-ingredient').addEventListener('click', addIngredient);



const addStep = (event) => {
  event.preventDefault();
  saveFormData();
  let newStep = `<div class="field">
    <label class="label">Instruction</label>
    <div class="control">
      <input class="input instruction" type="text" placeholder="Instruction" name="instruction">
    </div>
  </div>`;
  document.getElementById('instructions-container').insertAdjacentHTML('beforeend', newStep);
  populateForm();
};

const recipeFormHandler = async (event) => {
  event.preventDefault();

  const recipeName = document.querySelector('#recipe-name').value.trim();
  const recipeDescription = document.querySelector('#recipe-description').value.trim();
  const hasMeat = document.querySelector('#has-meat').value.trim();
  const imageFile = document.querySelector('#image').files[0]; // Get the image file from the form

  const ingredients = document.querySelectorAll('.ingredient');
  const instructions = document.querySelectorAll('.instruction');

  if (recipeName && recipeDescription && ingredients.length > 0 && instructions.length > 0) {
    const formData = new FormData();
    formData.append('recipe_name', recipeName);
    formData.append('description', recipeDescription);
    formData.append('has_meat', hasMeat);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    ingredients.forEach((ingredient) => {
      formData.append('ingredients[]', ingredient.value.trim());
    });

    instructions.forEach((instruction) => {
      formData.append('instructions[]', instruction.value.trim());
    });

    const response = await fetch('/api/recipes/new', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#add-ingredient').addEventListener('click', addIngredient);
document.querySelector('#add-step').addEventListener('click', addStep);
document.querySelector('.share-recipe-form').addEventListener('submit', recipeFormHandler);
