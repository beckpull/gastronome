const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// We're not using any custom helpers with handlebars yet--we can uncomment this when we make the file and some custom helpers.
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
      maxAge: 60 * 60 * 4 * 1000,
      httpOnly: true,
      secure: false,
      // sameSite: 'strict'
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
      console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
  );
});

