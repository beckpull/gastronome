const router = require('express').Router();
const { User, Recipe, Comment, Ingredient, Instruction } = require('../models');
const withAuth = require('../utils/auth');
const { UniqueRand } = require('uniquerand');
const { Op } = require('sequelize');


// User does not have to be logged in to see the home page. Home page will have forms to sign up and log in. At the home page, the user can see 4 recipes, each with a title, image, and teaser description.
// router.get('/', async (req, res) => {
//   try {
//     const recipeData = await Recipe.findAll({
//       // include: [Ingredient, Instruction],
//     });

//     const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

//     let min = 0;
//     let max = recipes.length - 1;
//     let count = 4;
//     // Generates an array of 4 unique random numbers between min and max (inclusive).
//     let arr = UniqueRand.getRandArr(min, max, count);
//     let selectedRecipes = [];
//     // For each randomly generated number in arr, find the recipe at that index and push it into the selectedRecipes array.
//     for (let i = 0; i < arr.length; i++) {
//       let selectedRecipe = recipes[arr[i]];
//       selectedRecipes.push(selectedRecipe);
//     }
//     console.log(selectedRecipes);

//     res.render('login', {
//       layout: 'landing',
//       selectedRecipes,
//       logged_in: req.session.logged_in,
//     });
//     // res.json(selectedRecipes);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// Ideally, when the user successfully logs in and is redirected to the all-recipes page, I would want to only show the title, image, and short description of each recipe, rather than displaying all of the ingredients and instructions there, too. I would want the user to have to click on 1 recipe to see its full details including ingredients and instructions. For now, we will render everything about every recipe on the all-recipes page.
router.get('/all', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [Ingredient, Instruction, { model: Comment, include: { model: User, attributes: ['username'] } }, { model: User, attributes: ['username'] }]
    });

    const recipes = recipeData.map((Recipe) =>
      Recipe.get({ plain: true })
    );
    console.log(recipes[0]);
    res.render('all-recipes', {
      recipes,
      logged_in: req.session.logged_in,
    });
    // res.json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get 1 recipe with a particular id, which the user can only do after being logged in. 
// The full route is localhost:PORT/api/recipes/:id 
router.get('/recipe/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: Ingredient,
        },
        {
          model: Instruction,
        }
      ]
    });
    const recipe = recipeData.get({ plain: true });
    // res.json(recipe);
    res.render('recipe', {
      recipe,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/my-recipes');
    return;
  }
  res.render('login', {
    layout: 'landing'
  });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/my-recipes');
    return;
  }
  res.render('signup', {
    layout: 'landing'
  });
});

// We will need to add withAuth before (req, res)
// This is for rendering the new-recipe page where the user can fill in a form to create a new recipe
router.get('/new-recipe', withAuth, (req, res) => {
  try {
    res.render('new-recipe',
      {
        logged_in: req.session.logged_in
      });
  } catch (error) {
    console.log(error);
  }
});

router.get('/my-recipes', withAuth, async (req, res) => {

  console.log(req.session);
  
  if (!req.session.user_id) {
    res.redirect('/signup');
  };

  try {
    const userData = await User.findByPk(req.session.user_id, {
      // attributes: { exclude: ['password'] },
      include: [
        {
          model: Recipe,
          include: [
            Ingredient,
            Instruction,
            {
              model: Comment,
              include: {
                model: User,
                attributes: ['username']
              }
            }
          ]
        }
      ],
    });

    console.log(userData);

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('my-recipes', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.redirect('/signup');
  }
});


// This is for getting the results of input in the search bar when the user is trying to search for a recipe
router.get('/find-recipe', async (req, res) => {
  const query = req.query.query;

  try {
    const recipes = await Recipe.findAll({
      where: {
        recipe_name: {
          [Op.iLike]: `%${query}%` // Case-insensitive search
        }
      },
    });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/update/:id', withAuth, async (req, res) => {
  const dbRecipeData = await Recipe.findByPk(req.params.id, {
    include: [{model: Ingredient}, {model: Instruction}]
  });
  const recipeData = dbRecipeData.get({ plain: true });
  // console.log(recipe);

  res.render('update', {recipeData, id: req.params.id, logged_in: req.session.logged_in, user_id: req.session.user_id});
});

router.get('/delete/:id', withAuth, async (req, res) => {
  const dbRecipeData = await Recipe.findByPk(req.params.id, {
    include: [{model: Ingredient}, {model: Instruction}]
  });
  const recipe = dbRecipeData.get({ plain: true });
  res.render('delete', {recipe, id: req.params.id, logged_in: req.session.logged_in, user_id: req.session.user_id});
});

router.get('/our-story', async (req, res) => {
  res.render('our-story');
});

router.get('/careers', async (req, res) => {
  res.render('careers');
});

router.get('/sustainability', async (req, res) => {
  res.render('sustainability');
});

router.get('/faq', async (req, res) => {
  res.render('faq');
});

router.get('/privacy', async (req, res) => {
  res.render('privacy');
})



module.exports = router;

