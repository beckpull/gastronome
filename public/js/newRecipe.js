const newRecipeFormHandler = async (event) => {
    event.preventDefault();
  
    const recipe_name = document.querySelector("#recipe_name").value.trim();
    const description = document.querySelector("#description").value.trim();
    const ingredients = document.querySelector("#ingredients").value.trim();
    const instructions = document.querySelector("#instructions").value.trim();
    const has_meat = document.querySelector("#has-meat").value.trim();
    const imageFile = document.querySelector("#image").files[0]; // Get the image file from the form
    
    try {
        let imageUrl = null;

        if (imageFile) {
            // use FormData to prepare the image file for upload
            const formData = new FormData();
            formData.append('image', imageFile);

            // upload image to Cloudinary using fetch
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            // parse the response JSON to get the image URL
            const data = await response.json();
            imageUrl = data.imageUrl;
        }

        // create a new recipe using the data collected
        const response = await fetch("/api/recipes/new", {
            method: "POST",
            body: JSON.stringify({ 
                recipe_name, 
                description, 
                imageUrl, 
                ingredients, 
                instructions, 
                has_meat, 
                user_id: req.session.user_id 
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // reload the page
            window.location.reload();
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error('Error creating recipe:', error);
        alert('Error creating recipe. Please try again.');
    }
};

document.querySelector(".newrecipe-form").addEventListener("submit", newRecipeFormHandler);







// necessary packages for functions:

const uploadImage = require('../../utils/uploadImage');
const withAuth = require('../../utils/auth');
const router = require('express').Router();
const { Recipe } = require('../../models');


// route for uploading a new image @ /api/upload:

router.post('/upload', withAuth, uploadImage, (req, res) => {
  // first we are hitting the withAuth middleware that'll kick us back to login if we aren't already logged in
  // the image has been uploaded by the uploadImage middleware

    // store the imageUrl in the session
    req.session.save(() => {
      req.session.imageUrl = req.body.imageUrl;
    })
    
  res.status(200).json({ imageUrl: req.body.imageUrl });
});

// route for creating a new recipe @ /api/recipes/new:

router.post('/recipes/new', withAuth, async (req, res) => {
  try {
    // extract recipe data from request body
    const { recipe_name, description, ingredients, instructions, has_meat } = req.body;

    // retrieve img url from session
    const imageUrl = req.session.imageUrl;

    // create the recipe in the db
    const newRecipe = await Recipe.create({
      recipe_name,
      description,
      imageUrl,
      ingredients,
      instructions,
      has_meat,
      user_id: req.session.user_id 
    });

    // send success response with the created recipe data
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


// html for rendering img:

{/* <img src="${recipe.imageUrl}" alt="Recipe Image"></img> */}