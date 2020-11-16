const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const fetch = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const zoom_token = process.env.zoom_token;

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

app.get('/meetings', async (req, res) => {

  try {
    const zoom_url = 'https://api.zoom.us/v2/users/Wq3hOAd6QsSDGuYInNBdyw/recordings/?from=2020-10-15';

    const returnedObject = await fetch.get(zoom_url).set('authorization', `Bearer ${zoom_token}`);

    res.json(returnedObject.body);

  } catch (e) {

    res.status(500).json({ error: e.message });

  }
})

app.get('/meetings', async (req, res) => {

  try {

    const data = await client.query(`
    SELECT
    meetingData.uuid,
      meetingData.host_id,
      meetingData.topic,
      meetingData.start_time,
      meetingData.share_url,
      meetingData.duration,
      meetingData.video_play_url,
      meetingData.audio_play_url,
      meetingData.meeting_views,
      meetingData.meeting_fav
    from meetingData
    ORDER BY meetingData.start_time ASC`,);

    res.json(data.rows);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/meetings/:id', async (req, res) => {

  try {
    const chosen_uuid = req.params.id;

    const data = await client.query(`
    SELECT
    meetingData.uuid,
    meetingData.host_id,
    meetingData.topic,
    meetingData.start_time,
    meetingData.share_url,
    meetingData.duration,
    meetingData.video_play_url,
    meetingData.audio_play_url,
    meetingData.meeting_views,
    meetingData.meeting_fav
    FROM meetingData
    WHERE meetingData.uuid = $1
    `, [chosen_uuid]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/favorites', async (req, res) => {

  try {

    const data = await client.query(`
  SELECT
  favorites.uuid,
  favorites.host_id,
  favorites.topic,
  favorites.start_time,
  favorites.timestamp,
  favorites.speaker,
  favorites.text,
  favorites.user_id
  FROM favorites`);

    res.json(data.rows[0]);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }


})

app.use(require('./middleware/error'));

module.exports = app;
