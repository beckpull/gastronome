const router = require('express').Router();
const { User } = require('../../models');


// Creating a new user when the user clicks the sign up button to submit their signup fields
// The full route is localhost:PORT/api/users
router.post('/', async (req, res) => {
    try {
        // Need to make sure that the frontend will send the name, email, and password in the req.body, since those are the columns needed to create a new user
        const userData = await User.create(req.body);

        req.session.save(() => {
            // We had just created a user using our sequelize model, so the user_id is automatically, incrementally generated. That's why userData has an id in it.
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// After the user enters their login info and clicks the button to log in, a FETCH POST request needs to be sent to this endpoint, /api/users/login. Here, we will check if we have the user saved in our database, check if they entered the right password, and if all goes well, we'll save their user_id and logged_in: true to the session object.
// The full route is localhost:PORT/api/users/login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // The reason why the below line should work, once we have the frontend code set up, is because:
        //  userData has access to the checkPassword() method defined on the User model (which does uses bcrypt.compareSync())
        // We are passing the password from the html form input to the checkPassword method, and the checkPassword method can access the password that is already saved for the user in our database.
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


// Destroy the user's session variables when they logout.
// The full route is localhost:PORT/api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
