const router = require('express').Router();
const { User, Recipe, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const recipeData = await Recipe.findAll();

        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        res.render('homepage', {
            recipes
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

