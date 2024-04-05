const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');
const uploadImage = require('../../utils/uploadImage');
const withAuth = require('../../utils/auth');


// Create a new recipe. We will need a form for the user to submit input, and we will need to decide which handlebars view to use for the page that has that form. I think it would be good to have a new-recipe.handlebars view which is just dedicated to this new-recipe form. We will have to have a nav link, probably on the all-recipes page, that allows the user to get to the new-recipe page in the first place.
// The full route is localhost:PORT/api/recipes 
// I REMOVED WITHAUTH. REMEMBER TO PUT IT BACK IN.
router.post('/recipes/new', withAuth, uploadImage, async (req, res) => {
    try {
      // Extract recipe data from request body
      const { recipe_name, description, has_meat, ingredients, instructions } = req.body;
  
      // Retrieve image URL from request body (set by uploadImage middleware)
      const imageUrl = req.body.imageUrl;
  
      // Create the recipe in the database
      const newRecipe = await Recipe.create({
        recipe_name,
        description,
        imageUrl,
        has_meat,
        user_id: req.session.user_id 
      });
  
      // Create ingredients for the recipe
      for (const ingredient of ingredients) {
        await Ingredient.create({
          ingredient,
          recipe_id: newRecipe.id
        });
      }
  
      // Create instructions for the recipe
      for (const instruction of instructions) {
        await Instruction.create({
          step: instruction,
          recipe_id: newRecipe.id
        });
      }
  
      // Send success response with the created recipe data
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error('Error creating recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// // Delete a recipe with a particular id.The full route is localhost:PORT/api/recipes/:id 
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const recipeData = await Recipe.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             }
//         });

//         if (!recipeData) {
//             res.status(404).json({ message: 'No recipe found with this id.' });
//             return;
//         } 

//         res.status(200).json(recipeData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;
