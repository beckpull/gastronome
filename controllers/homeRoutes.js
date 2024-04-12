const router = require('express').Router();
const { User, Recipe, Comment, Ingredient, Instruction } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

// Sets up functionality to render the all-recipes page using the serialized recipeData obtained by sequelize's findAll method (including the additional models needed to for the all-recipes page). In this route (and in additional routes throughout the application), withAuth middleware is used to check if the user is logged in and, if not, redirect them to '/' to log in.
router.get('/all', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [Ingredient, Instruction, { model: Comment, include: { model: User, attributes: ['username'] } }, { model: User, attributes: ['username'] }]
    });

    const recipes = recipeData.map((Recipe) =>
      Recipe.get({ plain: true })
    );

    res.render('all-recipes', {
      recipes,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


// Functionality to allow the user to view a single recipe, including the recipe's comments posted by certain users, and the recipe's ingredients and instructions.
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

    res.render('recipe', {
      recipe,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


// Functionality to render the login page when the user visits the root of the website (if the user is already logged in, they will be redirected to their My Recipes page).
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/my-recipes');
    return;
  }
  res.render('login', {
    layout: 'landing'
  });
});

// Functionality to render the signup page using the landing.handlebars layout when the user clicks the signup link in login.handlebars.
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/my-recipes');
    return;
  }
  res.render('signup', {
    layout: 'landing'
  });
});

// Functionality to render the new-recipe page where the user can fill in a form to create a new recipe.
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

// Functionality to render the my-recipes page where the user can view all of the recipes they have posted. This is used as a home page.
router.get('/my-recipes', withAuth, async (req, res) => {

  try {
    const userData = await User.findByPk(req.session.user_id, {
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
    res.redirect('/api/users/logout');
  }
});


// Uses Op.ilike as part of a case insensitive search for all recipes which include the text the user entered in the search bar. 
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

// Functionality to render the update.handlebars page, where a user can modify a recipe they previously posted. 
router.get('/update/:id', withAuth, async (req, res) => {
  const dbRecipeData = await Recipe.findByPk(req.params.id, {
    include: [{model: Ingredient}, {model: Instruction}]
  });
  const recipeData = dbRecipeData.get({ plain: true });

  res.render('update', {recipeData, id: req.params.id, logged_in: req.session.logged_in, user_id: req.session.user_id});
});

// Functionality to render the delete.handlebars page, where a user is directed to confirm they'd like to delete a recipe (after having clicked a recipe's delete button).
router.get('/delete/:id', withAuth, async (req, res) => {
  const dbRecipeData = await Recipe.findByPk(req.params.id, {
    include: [{model: Ingredient}, {model: Instruction}]
  });
  const recipe = dbRecipeData.get({ plain: true });
  res.render('delete', {recipe, id: req.params.id, logged_in: req.session.logged_in, user_id: req.session.user_id});
});

// The below routes render the accessory pages when the user clicks the respective link in the footer.

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

