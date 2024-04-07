const User = require('./User');
const Recipe = require('./Recipe');
const Comment = require('./Comment');
const Ingredient = require('./Ingredient');
const Instruction = require('./Instruction')


User.hasMany(Recipe, {
    foreignKey: 'user_id', 
    onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Comment, {
    foreignKey: 'recipe_id', 
    onDelete: 'CASCADE'
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Ingredient, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Ingredient.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

Recipe.hasMany(Instruction, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Instruction.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});


module.exports = { User, Recipe, Comment, Instruction, Ingredient };