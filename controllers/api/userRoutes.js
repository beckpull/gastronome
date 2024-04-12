const router = require('express').Router();
const { User } = require('../../models');

// Create a new user when the user clicks the sign up button to submit their signup fields
router.post('/', async (req, res) => {
    try {

        // Create a new user through sequelize's create method
        const userData = await User.create(req.body);

        req.session.save(() => {
            // Per the User model, user_id is automatically, incrementally generated. This user_id is used for the session object to track the user's session.
            req.session.user_id = userData.id;
            // Sets a logged_in property on the session object with a value of true--after creating the user, the user is logged in. 
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// After the user enters their login info and clicks the button to log in, a FETCH POST request is sent to this endpoint, /api/users/login. Here, we will check if the user is saved in our database and if the user entered the correct password. If the user exists and the password entered was correct, the user's user_id and logged_in property with the value of true are saved the session object.
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //  userData has access to the checkPassword method defined on the User model which uses bcrypt's compareSync method.
        // The password from the html form input element is essentially passed to the checkPassword method, and the checkPassword method accesses the password that is already saved for the user in our database. 
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

// Destroy the user's session variables when they logout (assuming the user was in fact logged in, which is tracked by the req.session object).
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

router.get('/logout', (req, res) => {
    // console.log("Hi!!!!!");
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
