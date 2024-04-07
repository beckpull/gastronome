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

router.put('/:id', withAuth, async (req, res) => {
  try {
    const row = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (row > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
