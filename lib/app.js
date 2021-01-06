/* eslint-disable space-before-function-paren */
const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');
const fetch = require('superagent');

const parseReturnedTeacherInfo = require('./utils/parseReturnedTeacherInfo.js');
const parseReturnedStudentInfo = require('./utils/parseReturnedStudentInfo.js')
// const parseMeetingsForListing = require('./utils/parseMeetingsForListing.js');
const insertNewTeacher = require('./utils/insertNewTeacher.js');
// const insertNewMeeting = require('./utils/insertNewMeeting.js');
const loadNewMeetings = require('./utils/loadNewMeetings.js');
const retrieveTeacherObj = require('./utils/retrieveTeacherObj.js');
const insertNewStudent = require('./utils/insertNewStudent.js')
const retrieveStudentObj = require('./utils/retrieveStudentObj.js');
const retrieveStudentMeetingArray = require('./utils/retrieveStudentMeetingArray.js')
const retrieveAllMeetings = require('./utils/retrieveAllMeetings.js');
const retrieveMeetingDetails = require('./utils/retrieveMeetingDetails.js');
const publishMeeting = require('./utils/publishMeeting.js');
const unpublishMeeting = require('./utils/unpublishMeeting.js');
const addMeetingView = require('./utils/addMeetingView.js');
const insertBookmark = require('./utils/insertNewBookmark.js');
const retrieveBookmarkArray = require('./utils/retrieveBookmarkArray.js');
const deleteBookmark = require('./utils/deleteBookmark.js')
const insertNewFavorite = require('./utils/insertNewFavorite.js');
const retrieveFavoriteArray = require('./utils/retrieveFavoriteArray.js');
const deleteFavorite = require('./utils/deleteFavorite.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const zoom_url = 'https://api.zoom.us/v2/';
const client_token = process.env.client_token;

app.post('/teacher/oauth', async (req, res) => {

  try {
    // client sends "code" returned from ZOOM OAUTH
    // this inserts that "code" into the access_token_url
    const access_token_url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.body.code}&redirect_uri=https://www.alchezoomy.com/redirect/`;

    // .post from ZOOM OAUTH endpoint
    let returnedObject = await fetch
      .post(access_token_url)
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


app.post('/teacher/new', async (req, res) => {

  const newTeacherInfo = req.body.teacher_info;
  try {

    const teacherInfo = await insertNewTeacher(newTeacherInfo);

    // const parsedMeetingArray = await loadNewMeetings(returnedMeetingObject.body, newTeacherInfo, teacherId);

    res.status(200).json(teacherInfo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.post('/teacher/meetings', async (req, res) => {

  const teacherInfo = req.body.teacher_info;
  let returnedMeetingObject;

  try {
    if (teacherInfo.last_update === teacherInfo.account_created) {
      returnedMeetingObject = await fetch
        .get(`${zoom_url}users/me/recordings?from=2020-10-01`)
        .set('Authorization', 'Bearer ' + teacherInfo.access_token);
    } else {

      returnedMeetingObject = await fetch
        .get(`${zoom_url}users/me/recordings?from=${teacherInfo.last_update.slice(0, 10)}`)
        .set('Authorization', 'Bearer ' + teacherInfo.access_token);
    }

    await loadNewMeetings(returnedMeetingObject.body, teacherInfo, teacherInfo.id);

    const completeMeetingList = await retrieveAllMeetings(teacherInfo.id);

    res.status(200).json(completeMeetingList);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




app.post('/teacher/publish/', async (req, res) => {

  const meetingId = req.body.meetingId;
  const accessToken = req.body.access_token;

  try {
    const meetingObj = await publishMeeting(meetingId, accessToken);

    const arrayOfMeetings = await retrieveAllMeetings(meetingObj.teacher_id);

    res.status(200).json(arrayOfMeetings);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/teacher/unpublish/', async (req, res) => {

  const meetingId = req.body.meetingId;

  try {
    const meetingObj = await unpublishMeeting(meetingId);

    const arrayOfMeetings = await retrieveAllMeetings(meetingObj.teacher_id);

    res.status(200).json(arrayOfMeetings);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }

})


app.post('/student/oauth', async (req, res) => {

  try {
    // client sends "code" returned from ZOOM OAUTH
    // this inserts that "code" into the access_token_url
    const access_token_url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.body.code}&redirect_uri=https://www.alchezoomy.com/redirect/`;

    // .post from ZOOM OAUTH endpoint
    let returnedObject = await fetch
      .post(access_token_url)
      .set('Authorization', `Basic ${client_token}`);
    // ZOOM OAUTH should return oauthToken
    // this token allows server access to user's information
    const oauthToken = returnedObject.body.access_token;

    // .get's user information from ZOOM API
    let returnedStudentInfo = await fetch
      .get(zoom_url + 'users/me')
      .set('Authorization', 'Bearer ' + oauthToken);

    // parses through returned user info to userable format
    const parsedStudentInfo = await parseReturnedStudentInfo(returnedStudentInfo.body, oauthToken);

    // returns that userInfo back to client-side
    res.status(200).json(parsedStudentInfo);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.post('/student/new', async (req, res) => {
  const newStudentInfo = req.body.student_info;
  try {
    const returnedStudentInfo = await insertNewStudent(newStudentInfo);


    res.status(200).json(returnedStudentInfo)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/student/meetings', async (req, res) => {

  const studentInfo = req.body.student_info;

  try {
    const studentObj = await retrieveStudentObj(studentInfo)

    const studentMeetingArray = await retrieveStudentMeetingArray(studentObj.permissions);

    res.status(200).json(studentMeetingArray);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

})

app.get('/student/meetings/:id', async (req, res) => {

  try {
    const meetingId = req.params.id;

    const meetingDetails = await retrieveMeetingDetails(meetingId);

    res.status(200).json(meetingDetails);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

})

app.get('/student/view/:id', async (req, res) => {
  const meetingId = req.params.id;
  try {
    await addMeetingView(meetingId);

    res.status(200).json({ status: 'success' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/student/bookmark', async (req, res) => {
  const bookmarkItem = req.body;
  try {
    await insertBookmark(bookmarkItem);
    const bookmarks = await retrieveBookmarkArray(bookmarkItem.studentId);

    res.status(200).json(bookmarks);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }

});

app.get(`/student/bookmark/:id`, async (req, res) => {
  const studentId = req.params.id;
  try {
    const bookmarks = await retrieveBookmarkArray(studentId);
    res.status(200).json(bookmarks);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.delete(`/student/bookmark/:id`, async (req, res) => {
  const bookmarkId = req.params.id;
  try {
    const studentId = await deleteBookmark(bookmarkId)
    const bookmarks = await retrieveBookmarkArray(studentId);
    res.status(200).json(bookmarks);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post(`/student/favorite`, async (req, res) => {
  const favoriteObj = req.body
  try {
    await insertNewFavorite(favoriteObj);
    const favoriteArray = await retrieveFavoriteArray(favoriteObj.studentId)

    res.status(200).json(favoriteArray);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.get(`/student/favorite/:id`, async (req, res) => {
  const studentId = req.params.id;
  try {
    const favoriteArray = await retrieveFavoriteArray(studentId)

    res.status(200).json(favoriteArray);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.delete(`/student/favorite/:id`, async (req, res) => {
  const favoriteId = req.params.id;
  try {
    const studentId = await deleteFavorite(favoriteId);
    const favoriteArray = await retrieveFavoriteArray(studentId)

    res.status(200).json(favoriteArray);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})


module.exports = app;

