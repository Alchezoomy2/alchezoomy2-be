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

app.get('/seed_meetings', async (req, res) => {

  try {
    const zoom_url = 'https://api.zoom.us/v2/users/Wq3hOAd6QsSDGuYInNBdyw/recordings/?from=2020-10-15';

    const returnedObject = await fetch.get(zoom_url).set('authorization', `Bearer ${zoom_token}`);

    res.json(returnedObject.body);

  } catch (e) {

    res.status(500).json({ error: e.message });

  }
})

app.get('/api/meetings', async (req, res) => {

  try {

    const data = await client.query(`
    SELECT
    meetings.uuid,
      meetings.host_id,
      meetings.topic,
      meetings.start_time,
      meetings.share_url,
      meetings.duration,
      meetings.video_play_url,
      meetings.audio_play_url,
      meetings.meeting_views,
      meetings.meeting_fav
    from meetings
    ORDER BY meetings.start_time ASC`,);

    res.json(data.rows);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/api/meetings/:id', async (req, res) => {

  try {
    const chosen_uuid = req.params.id;

    const data = await client.query(`
    SELECT
    meetings.uuid,
    meetings.host_id,
    meetings.topic,
    meetings.start_time,
    meetings.share_url,
    meetings.duration,
    meetings.video_play_url,
    meetings.audio_play_url,
    meetings.meeting_views,
    meetings.meeting_fav
    FROM meetings
    WHERE meetings.uuid = $1
    `, [chosen_uuid]);

    res.json(data.rows[0]);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/api/favorites', async (req, res) => {

  try {
    console.log('req.userID  ' + req.userId);
    const data = await client.query(`
    SELECT
    favorites.uuid,
    favorites.host_id,
    favorites.topic,
    favorites.start_time,
    favorites.timestamp,
    favorites.speaker,
    favorites.text,
    favorites.owner_id
    FROM favorites
    WHERE favorites.owner_id = $1`
    [req.userId]);

    console.log(data.rows)
    res.json(data.rows);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }

  app.delete('/api/favorites/:id', async (req, res) => {

    try {

      const fav_uuid = req.params.id;
      const data = await client.query(`
      DELETE from favorites
      WHERE favorites.uuid = $1
      AND favorites.user_id = $2
      RETURNING *`, [fav_uuid, req.userId]);

      res.json(data.rows[0]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  });

  app.post('/api/favorites', async (req, res) => {

    try {

      const new_fav = req.body;

      const data = await client.query(`
      INSERT INTO favorites
      (uuid, host_id, topic, start_time, timestamp, speaker, text, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`
      [new_fav.uuid, new_fav.host_id, new_fav.topic, new_fav, start_time, new_fav.timestamp, new_fav.speaker, new_fav.text, req.userId]);

      res.json(data.rows[0]);
    } catch (e) {

      res.status(500).json({ error: e.message });
    }
  })

})

app.use(require('./middleware/error'));

module.exports = app;
