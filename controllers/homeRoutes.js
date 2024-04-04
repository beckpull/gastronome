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

    res.render('homepage', { ...recipes });
    // res.json(selectedRecipes);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Ideally, when the user successfully logs in and is redirected to the all-recipes page, I would want to only show the title, image, and short description of each recipe, rather than displaying all of the ingredients and instructions there, too. I would want the user to have to click on 1 recipe to see its full details including ingredients and instructions. For now, we will render everything about every recipe on the all-recipes page.
router.get('/all', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [{ model: Comment, include: {model: User, attributes: ['username']} }, { model: User, attributes: ['username'] }]
    });

    const recipes = recipeData.map((Recipe) =>
    Recipe.get({ plain: true })
    );

    res.render('all-recipes', {
        ...recipes, 
        logged_in: req.session.logged_in
    });
    // res.json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get 1 recipe with a particular id, which the user can only do after being logged in. 
// I PERSONALLY PREFER THIS ROUTE TO BE IN recipeRoutes RATHER THAN homeRoutes--CHECK THAT IT CAUSES NO ISSUES.
// The full route is localhost:PORT/api/recipes/:id 
router.get('/recipe/:id', withAuth, async (req, res) => {
  try {
      const recipeData = await Recipe.findByPk(req.params.id, {
          include: [
              {
                  model: User, 
                  attributes: ['name'],
              },
              {
                  model: Comment, 
                  attributes: ['content'],
              }
          ]
      });
      const recipe = recipeData.get({ plain: true });

      res.render('recipe', {
          recipe, 
          logged_in: req.session.logged_in
      });
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

