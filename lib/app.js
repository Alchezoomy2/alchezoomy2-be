/* eslint-disable space-before-function-paren */
const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const fetch = require('superagent');
// const filterMeetingsForDownloadUrls = require('./utils/filterMeetingsForDownloadURLs.js');
const parseReturnedTeacherInfo = require('./utils/parseReturnedTeacherInfo.js');
const parseMeetingsForListing = require('./utils/parseMeetingsForListing.js');
const insertNewTeacher = require('./utils/insertNewTeacher.js');
const insertNewMeeting = require('./utils/insertNewMeeting.js');
const loadNewMeetings = require('./utils/loadNewMeetings.js');
const retrieveTeacherId = require('./utils/retrieveTeacherId.js');
const retrieveAllMeetings = require('./utils/retrieveAllMeetings.js');
const publishMeeting = require('./utils/publishMeeting.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const zoom_url = 'https://api.zoom.us/v2/';
const client_token = process.env.client_token;

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
    message: `in this protected route, we get the user's id like so: ${req.userId}`,
  });
});


app.post('/oauth', async (req, res) => {

  try {
    // client sends "code" returned from ZOOM OAUTH
    // this inserts that "code" into the access_token_url
    const acccess_token_url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.body.code}&redirect_uri=https://alchezoomy2.netlify.app/redirect`;

    // .post from ZOOM OAUTH endpoint
    let returnedObject = await fetch
      .post(acccess_token_url)
      .set('Authorization', `Basic ${client_token}`);

    // ZOOM OAUTH should return oauthToken
    // this token allows server access to user's information
    const oauthToken = returnedObject.body.access_token;

    // .get's user information from ZOOM API
    let returnedTeacherInfo = await fetch
      .get(zoom_url + 'users/me')
      .set('Authorization', 'Bearer ' + oauthToken);

    // parses through returned user info to userable format
    const parsedTeacherInfo = await parseReturnedTeacherInfo(returnedTeacherInfo.body, oauthToken);

    // returns that userInfo back to client-side
    res.status(200).json(parsedTeacherInfo);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.post('/meetings/', async (req, res) => {

  const teacherInfo = req.body.teacher_info;
  try {
    const teacherObj = retrieveTeacherId(teacherInfo)


    const returnedMeetingObject = await fetch
      .get(`${zoom_url}users/me/recordings?from=${teacherObj.last_update}`)
      .set('Authorization', 'Bearer ' + teacherInfo.access_token);

    const parsedMeetingArray = await loadNewMeetings(returnedMeetingObject.body, teacherInfo, teacherObj.id);

    const completeMeetingList = await retrieveAllMeetings(teacherObj.id);

    res.status(200).json(completeMeetingList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

});

app.post('/new_teacher/', async (req, res) => {

  const newTeacherInfo = req.body.teacher_info;
  try {

    const returnedMeetingObject = await fetch
      .get(zoom_url + 'users/me/recordings?from=2020-10-10')
      .set('Authorization', 'Bearer ' + newTeacherInfo.access_token);

    const teacherId = await insertNewTeacher(newTeacherInfo);

    const parsedMeetingArray = await loadNewMeetings(returnedMeetingObject.body, newTeacherInfo, teacherId);

    res.status(200).json(parsedMeetingArray);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.post('/publish/', async (req, res) => {

  const meetingId = req.body;

  console.log(meetingId);

  try {
    await publishMeeting(meetingId);

    res.status(200);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// app.post('/new_meeting', async (req, res) => {
//   try {
//     const new_meeting = req.body;
//     await filterMeetingsForDownloadUrls([new_meeting]);
//     res.status(200);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// app.get('/seed_meetings', async (req, res) => {
//   try {

//     const ryan_zoom_url =
//       'https://api.zoom.us/v2/users/Wq3hOAd6QsSDGuYInNBdyw/recordings/?from=2020-11-12&to=2020-11-19';

//     let returnedObject = await fetch
//       .get(ryan_zoom_url)
//       .set('Authorization', `Bearer ${zoom_token}`);

//     await filterMeetingsForDownloadUrls(returnedObject.body);

//     res.json(returnedObject);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

//TEST FUNCTION TO BE REMOVED
app.get('/transcripts', async (req, res) => {
  try {
    const data = await client.query(`
    SELECT * from transcripts`);
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// TEST FUNCTION TO BE REMOVED
app.get('/transcripts', async (req, res) => {
  try {
    const data = await client.query(`
    SELECT * from transcripts`);
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// TEST FUNCTION TO BE REMOVED
// app.get('/meetings', async (req, res) => {

//   try {
//     const data = await client.query(`
//     SELECT * FROM meetings
//     `);
//     res.json(data.rows);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

app.get('/api/chats/:id', async (req, res) => {
  const chosen_uuid = req.params.id;
  try {
    const data = await client.query(
      `
    SELECT * FROM chats
    WHERE chats.uuid = $1
    `,
      [chosen_uuid]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/transcripts/:id', async (req, res) => {
  try {
    const chosen_uuid = req.params.id;

    const data = await client.query(
      `
    SELECT * FROM transcripts
    WHERE transcripts.uuid = $1
    `,
      [chosen_uuid]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/meetings', async (req, res) => {

  console.log(req.query);

  if (req.query.search) {

    const search_param = req.query;

    try {

      const data = await client.query(`
      SELECT * 
      FROM meetings
      WHERE topic LIKE $1
      ORDER BY meetings.start_time DESC
      `,
        [`%${search_param.search}%`]);

      res.json(data.rows);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  } else {
    try {
      const data = await client.query(`
      SELECT * FROM meetings
      ORDER BY meetings.start_time DESC`);

      res.json(data.rows);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  }
});


app.get('/api/meetings/:id', async (req, res) => {
  try {
    const chosen_uuid = req.params.id;

    const data = await client.query(
      `
    SELECT *
    FROM meetings
    WHERE meetings.uuid = $1
    `,
      [chosen_uuid]
    );
    res.json(data.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/favorites', async (req, res) => {
  const new_fav = req.body;

  try {
    const data = await client.query(
      `
      INSERT INTO favorites
      (uuid, topic, start_time, owner_id) 
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        new_fav.uuid,
        new_fav.topic,
        new_fav.start_time,
        req.userId,
      ]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const data = await client.query(
      `
    SELECT
    favorites.uuid,
    favorites.id,
    favorites.topic,
    favorites.start_time,
    favorites.owner_id
    FROM favorites
    WHERE favorites.owner_id = $1`,
      [req.userId]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const fav_uuid = req.params.id;
    const data = await client.query(
      `
      DELETE from favorites
      WHERE favorites.uuid = $1
      AND favorites.owner_id = $2
      RETURNING *`,
      [fav_uuid, req.userId]
    );

    res.json(data.rows);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});


app.get('/api/bookmarks', async (req, res) => {
  try {
    const data = await client.query(
      `
    SELECT
    bookmarks.id,
    bookmarks.uuid,
    bookmarks.host_id,
    bookmarks.topic,
    bookmarks.start_time,
    bookmarks.identifier,
    bookmarks.time_start,
    bookmarks.speaker,
    bookmarks.text,
    bookmarks.comments,
    bookmarks.owner_id
    FROM bookmarks
    WHERE bookmarks.owner_id = $1`,
      [req.userId]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/bookmarks', async (req, res) => {
  const new_bookmark = req.body;

  try {
    const data = await client.query(
      `
    INSERT INTO bookmarks
    (uuid, host_id, topic, start_time, identifier, time_start, speaker, text, comments, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
      [
        new_bookmark.uuid,
        new_bookmark.host_id,
        new_bookmark.topic,
        new_bookmark.start_time,
        new_bookmark.identifier,
        new_bookmark.time_start,
        new_bookmark.speaker,
        new_bookmark.text,
        new_bookmark.comments,
        req.userId,
      ]
    );

    app.delete('/api/bookmarks/:id', async (req, res) => {
      try {
        const bookmarks_id = req.params.id;
        const data = await client.query(
          `
          DELETE from bookmarks
          WHERE bookmarks.id = $1
          AND bookmarks.owner_id = $2
          RETURNING *`,
          [bookmarks_id, req.userId]
        );
        res.json(data.rows);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;

