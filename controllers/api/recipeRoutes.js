const router = require('express').Router();
const { Recipe, Ingredient, Instruction } = require('../../models');
const uploadImage = require('../../utils/uploadImage');
const withAuth = require('../../utils/auth');


router.post('/create-recipe', withAuth, uploadImage, async (req, res) => {
  // console.log("POST ROUTE");
  try {
    const imageUrl = req.body.imageUrl;

    const { recipe_name, description, has_meat, ingredients, instructions } = req.body;

    // Create the recipe in the database
    const newRecipe = await Recipe.create({
      recipe_name,
      description,
      imageUrl,
      has_meat,
      user_id: req.session.user_id
    });

    // Create ingredients for the recipe
    await Promise.all(ingredients.split(',').map(async (ingredient) => {
      await Ingredient.create({
        ingredient,
        recipe_id: newRecipe.id
      });
    }));

    // Create instructions for the recipe
    await Promise.all(instructions.split(',').map(async (instruction) => {
      await Instruction.create({
        step: instruction,
        recipe_id: newRecipe.id
      });
    }));
    console.log(newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update/:id', withAuth, uploadImage, async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl;

    const { recipe_name, description, has_meat, ingredients, instructions } = req.body;

    // Update the recipe in the database
    const updatedRecipe = await Recipe.update({
      recipe_name,
      description,
      imageUrl,
      has_meat
    }, {
      where: {
        id: req.params.id
      }
    });

    // Delete existing ingredients and instructions associated with the recipe
    await Ingredient.destroy({
      where: {
        recipe_id: req.params.id
      }
    });

    await Instruction.destroy({
      where: {
        recipe_id: req.params.id
      }
    });

    // Create ingredients for the updated recipe
    await Promise.all(ingredients.split(',').map(async (ingredient) => {
      await Ingredient.create({
        ingredient,
        recipe_id: req.params.id
      });
    }));

    // Create instructions for the updated recipe
    await Promise.all(instructions.split(',').map(async (instruction) => {
      await Instruction.create({
        step: instruction,
        recipe_id: req.params.id
      });
    }));

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a recipe with a particular id.The full route is localhost:PORT/api/recipes/:id 
router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id.' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
