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
  let newIngredient = `<div id="ingredients-wrapper">
    <div class="field">
      <label class="label" id="ingredients-label" style="font-style: italic">ingredient</label>
      <div class="control">
        <input class="input ingredient" id="ingredients-input-el" type="text" placeholder="ingredient" name="ingredient${counter}">
      </div>
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
  let newStep = `<div id="instructions-wrapper">
    <div class="field">
      <label class="label" id="instructions-label" style="font-style: italic">instruction</label>
      <div class="control">
        <input class="input instruction" id="instructions-input-el" type="text" placeholder="step" name="instruction${counter2}">
      </div>
     </div>
    </div>`;
  document.getElementById('instructions-container').insertAdjacentHTML('beforeend', newStep);
  await populateForm();
  counter2++;
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

  formData.append('ingredients', ingredients);

  const nodeList2 = document.querySelectorAll('.instruction');
  const instructions = Array.from(nodeList2).map(input => input.value);

  formData.append('instructions', instructions);

  try {
    // Send FormData to server
    const response = await fetch('/api/recipes/create-recipe', {
      method: 'POST',
      body: formData
    });

    document.location.replace('my-recipes');
  } catch (error) {
    console.error('Error creating recipe:', error);
  }
};

// Add event listeners
document.querySelector('#share-btn').addEventListener('click', submitForm);
document.querySelector('#add-ingredient').addEventListener('click', addIngredient);
document.querySelector('#add-step').addEventListener('click', addStep);

