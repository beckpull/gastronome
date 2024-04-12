const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Posts a new comment using the request body sent from the frontend javascript, the user_id saved in the session object from when the user logged in, and the recipe_id from the request parameter in the url. This allows a comment to be associated with the user who posted it and the recipe the comment refers to.
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      recipe_id: req.params.id
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
