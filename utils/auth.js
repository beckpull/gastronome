const withAuth = (req, res, next) => {
  console.log(req.session);
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    // Otherwise, continue to the next step (withAuth is used as middleware).
    next();
  }
};

module.exports = withAuth;
