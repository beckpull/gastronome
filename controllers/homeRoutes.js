const router = require('express').Router();
const { User, Recipe, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { UniqueRand } = require('uniquerand');


// User does not have to be logged in to see the home page. Home page will have forms to sign up and log in. At the home page, the user can see 4 recipes, each with a title, image, and teaser description.
router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll();

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    let min = 0;
    let max = recipes.length - 1;
    let count = 4;
    // Generates an array of 4 unique random numbers between min and max (inclusive).
    let arr = UniqueRand.getRandArr(min, max, count);
    let selectedRecipes = [];
    // For each randomly generated number in arr, find the recipe at that index and push it into the selectedRecipes array.
    for (let i = 0; i < arr.length; i++) {
      let selectedRecipe = recipes[arr[i]];
      selectedRecipes.push(selectedRecipe);
    }
    console.log(selectedRecipes);

    // res.render('homepage', { recipes });
    res.json(selectedRecipes);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Ideally, when the user successfully logs in and is redirected to the all-recipes page, I would want to only show the title, image, and short description of each recipe, rather than displaying all of the ingredients and instructions there, too. I would want the user to have to click on 1 recipe to see its full details including ingredients and instructions. For now, we will render everything about every recipe on the all-recipes page.
router.get('/all-recipes', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }, { model: User }]
    });

    const serializedRecipes = recipeData.get({ plain: true });

    // res.render('all-recipes', {
    //     ...serializedRecipes, 
    //     logged_in: true
    // });
    res.json(serializedRecipes);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/all-recipes');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/all-recipes');
    return;
  }
  res.render('signup');
});


module.exports = router;

