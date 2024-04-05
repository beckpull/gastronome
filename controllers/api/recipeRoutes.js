const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new recipe. We will need a form for the user to submit input, and we will need to decide which handlebars view to use for the page that has that form. I think it would be good to have a new-recipe.handlebars view which is just dedicated to this new-recipe form. We will have to have a nav link, probably on the all-recipes page, that allows the user to get to the new-recipe page in the first place.
// The full route is localhost:PORT/api/recipes 
// I REMOVED WITHAUTH. REMEMBER TO PUT IT BACK IN.
router.post('/', async (req, res) => {
    // {
    //     recipeName: 'Recipe Name',
    //     recipeDescription: 'This is my description',
    //     ingredientsArray: [ 'ingredient 1', 'ingredient 2', 'ingredient 3' ],
    //     instructionsArray: [ 'step 1', 'step 2', 'step 3' ]
    //   }
    console.log(req.body);

    try {
        const newRecipe = await Recipe.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newRecipe);
    } catch (err) {
        res.status(400).json(err);
    }
});



// Delete a recipe with a particular id.The full route is localhost:PORT/api/recipes/:id 
router.delete('/:id', withAuth, async (req, res) => {
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
        res.status(500).json(err);
    }
});


module.exports = router;
