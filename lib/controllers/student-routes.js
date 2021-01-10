const { Router } = require('express');

const insertNewStudent = require('./utils/insertNewStudent.js')
const retrieveStudentObj = require('./utils/retrieveStudentObj.js');
const retrieveStudentMeetingArray = require('./utils/retrieveStudentMeetingArray.js')
const retrieveMeetingDetails = require('./utils/retrieveMeetingDetails.js');
const addMeetingView = require('./utils/addMeetingView.js');
const insertBookmark = require('./utils/insertNewBookmark.js');
const retrieveBookmarkArray = require('./utils/retrieveBookmarkArray.js');
const deleteBookmark = require('./utils/deleteBookmark.js')
const insertNewFavorite = require('./utils/insertNewFavorite.js');
const retrieveFavoriteArray = require('./utils/retrieveFavoriteArray.js');
const deleteFavorite = require('./utils/deleteFavorite.js');

const parseReturnedStudentInfo = require('./utils/parseReturnedStudentInfo.js')

const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomURL = process.env.ZOOM_URL


module.exports = Router()

    .post('/oauth', async (req, res) => {

        try {
            // client sends "code" returned from ZOOM OAUTH
            // this inserts that "code" into the access_token_url
            const accessTokenUrl = precodeAccessUrl + req.body.code + postcodeAccessUrl;

            // .post from ZOOM OAUTH endpoint
            let returnedObject = await fetch
                .post(accessTokenUrl)
                .set('Authorization', `Basic ${clientToken}`);
            // ZOOM OAUTH should return oauthToken
            // this token allows server access to user's information
            const oauthToken = returnedObject.body.access_token;

            // .get's user information from ZOOM API
            let returnedStudentInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            // parses through returned user info to userable format
            const parsedStudentInfo = await parseReturnedStudentInfo(returnedStudentInfo.body, oauthToken);

            // returns that userInfo back to client-side
            res.status(200).json(parsedStudentInfo);

        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', async (req, res) => {
        const newStudentInfo = req.body.student_info;
        try {
            const returnedStudentInfo = await insertNewStudent(newStudentInfo);


            res.status(200).json(returnedStudentInfo)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .post('/meetings', async (req, res) => {

        const studentInfo = req.body.student_info;

        try {
            const studentObj = await retrieveStudentObj(studentInfo)

            const studentMeetingArray = await retrieveStudentMeetingArray(studentObj.permissions);

            res.status(200).json(studentMeetingArray);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })

    .get('/meetings/:id', async (req, res) => {

        try {
            const meetingId = req.params.id;

            const meetingDetails = await retrieveMeetingDetails(meetingId);

            res.status(200).json(meetingDetails);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })

    .get('/view/:id', async (req, res) => {
        const meetingId = req.params.id;
        try {
            await addMeetingView(meetingId);

            res.status(200).json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })


    .post('/bookmark', async (req, res) => {
        const bookmarkItem = req.body;
        try {
            await insertBookmark(bookmarkItem);
            const bookmarks = await retrieveBookmarkArray(bookmarkItem.studentId);

            res.status(200).json(bookmarks);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    })

    .get(`/bookmark/:id`, async (req, res) => {
        const studentId = req.params.id;
        try {
            const bookmarks = await retrieveBookmarkArray(studentId);
            res.status(200).json(bookmarks);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/bookmark/:id`, async (req, res) => {
        const bookmarkId = req.params.id;
        try {
            const studentId = await deleteBookmark(bookmarkId)
            const bookmarks = await retrieveBookmarkArray(studentId);
            res.status(200).json(bookmarks);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .post(`/favorite`, async (req, res) => {
        const favoriteObj = req.body
        try {
            await insertNewFavorite(favoriteObj);
            const favoriteArray = await retrieveFavoriteArray(favoriteObj.studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .get(`/favorite/:id`, async (req, res) => {
        const studentId = req.params.id;
        try {
            const favoriteArray = await retrieveFavoriteArray(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/favorite/:id`, async (req, res) => {
        const favoriteId = req.params.id;
        try {
            const studentId = await deleteFavorite(favoriteId);
            const favoriteArray = await retrieveFavoriteArray(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })