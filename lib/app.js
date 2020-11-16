const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const fetch = require('superagent');
const { json } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.post('/oauth/', async (req, res) => {
  try {
    const access_token_url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.body.token}&redirect_uri=https://alchezoomy.netlify.app/redirect`;
    const header = { 'Authorization': 'Basic QXhyYkg4M19RMGFFTzI3M2RGSWFmdzpnZjd6S2dQeXFlaFI2NXdvakE3bTlVTnpRYzg1QUxrUg==' };

    let access_token = '';

    const returnedObject = await fetch.post(access_token_url)
      .set(header);

    access_token = returnedObject.data.access_token;

    console.log(access_token);

  } catch (e) {

    res.json(500).json({ error: e.message });
  }
})

app.get('/animals', async (req, res) => {
  try {
    const data = await client.query('SELECT * from animals');

    res.json(data.rows);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
