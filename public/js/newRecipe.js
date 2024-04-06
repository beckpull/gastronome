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
async function populateForm() {
  try {
    const formData = new FormData(document.getElementById('recipe-form'));
    for (const [key, value] of formData.entries()) {
      const element = document.querySelector(`[name="${key}"]`);
      if (element) {
        element.value = value;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

let counter = 2;

const addIngredient = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  await saveFormData(); // Save form data to session storage
  let newIngredient = `<div class="field">
      <label class="label">Ingredient</label>
      <div class="control">
        <input class="input ingredient" type="text" placeholder="Ingredient" name="ingredient${counter}">
      </div>
    </div>`;
  document.getElementById('ingredients-container').insertAdjacentHTML('beforeend', newIngredient);
  await populateForm(); // Populate form fields with session storage data
  counter++;
};


let counter2 = 2;

const addStep = async (event) => {
  event.preventDefault();
  await saveFormData();
  let newStep = `<div class="field">
      <label class="label">Instruction</label>
      <div class="control">
        <input class="input instruction" type="text" placeholder="Instruction" name="instruction${counter2}">
      </div>
     </div>`;
  document.getElementById('instructions-container').insertAdjacentHTML('beforeend', newStep);
  await populateForm();
  counter2++;
};

const handleFileSelection = () => {
  const fileInput = document.getElementById('uploadFile');
  fileInput.click(); // Trigger file input click
};

const submitForm = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

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
  // console.log(ingredients);

  formData.append('ingredients', ingredients);

  const nodeList2 = document.querySelectorAll('.ingredient');
  const instructions = Array.from(nodeList).map(input => input.value);
  // console.log(instructions);

  formData.append('instructions', instructions);

  try {
    // Send FormData to server
    const response = await fetch('/api/recipes/create-recipe', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // If the upload is successful, redirect or display a success message
      console.log('Recipe created successfully');
      // Redirect or display success message as needed
    } else {
      // Handle error if upload fails
      console.error('Error creating recipe:', response.statusText);
      // Display an error message to the user
    }
  } catch (error) {
    console.error('Error creating recipe:', error);
    // Display an error message to the user
  }
};

// Add event listeners
document.querySelector('.file-upload-btn').addEventListener('click', handleFileSelection);
document.querySelector('#share-btn').addEventListener('click', submitForm);
// document.querySelector('#share-btn').addEventListener('click', recipeFormHandler);
document.querySelector('#add-ingredient').addEventListener('click', addIngredient);
document.querySelector('#add-step').addEventListener('click', addStep);

