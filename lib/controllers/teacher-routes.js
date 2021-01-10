const { Router } = require('express');
const fetch = require('superagent');


const Teacher = require('../models/Teacher.js');

const parseReturnedTeacherInfo = require('../utils/parseReturnedTeacherInfo.js');
const insertNewTeacher = require('../utils/old-insertNewTeacher.js');
const loadNewMeetings = require('../utils/loadNewMeetings.js');
const retrieveTeacherObj = require('../utils/old-retrieveTeacherObj.js');
const retrieveAllMeetings = require('../utils/retrieveAllMeetings.js');
const publishMeeting = require('../utils/publishMeeting.js');
const unpublishMeeting = require('../utils/unpublishMeeting.js');

const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomUrl = process.env.ZOOM_URL

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
            let returnedTeacherInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            // parses through returned user info to userable format
            const parsedTeacherInfo = await parseReturnedTeacherInfo(returnedTeacherInfo.body, oauthToken);
            // returns that userInfo back to client-side
            res.status(200).json(parsedTeacherInfo);

        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', async (req, res) => {

        const newTeacherInfo = req.body.teacher_info;
        try {

            // const teacherInfo = await insertNewTeacher(newTeacherInfo);
            const newTeacher = await Teacher.insert(newTeacherInfo)
            console.log(newTeacher)
            res.status(200).json(newTeacher);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })


    .post('/meetings', async (req, res) => {

        const teacherInfo = req.body.teacher_info;
        let returnedMeetingObject;

        try {
            if (teacherInfo.last_update === teacherInfo.account_created) {
                returnedMeetingObject = await fetch
                    .get(`${zoomUrl}users/me/recordings?from=2020-10-01`)
                    .set('Authorization', 'Bearer ' + teacherInfo.access_token);
            } else {

                returnedMeetingObject = await fetch
                    .get(`${zoomUrl}users/me/recordings?from=${teacherInfo.last_update.slice(0, 10)}`)
                    .set('Authorization', 'Bearer ' + teacherInfo.access_token);
            }

            await loadNewMeetings(returnedMeetingObject.body, teacherInfo, teacherInfo.id);

            const completeMeetingList = await retrieveAllMeetings(teacherInfo.id);

            res.status(200).json(completeMeetingList);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/publish/', async (req, res) => {

        const meetingId = req.body.meetingId;
        const accessToken = req.body.access_token;

        try {
            const meetingObj = await publishMeeting(meetingId, accessToken);

            const arrayOfMeetings = await retrieveAllMeetings(meetingObj.teacher_id);

            res.status(200).json(arrayOfMeetings);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/unpublish/', async (req, res) => {

        const meetingId = req.body.meetingId;

        try {
            const meetingObj = await unpublishMeeting(meetingId);

            const arrayOfMeetings = await retrieveAllMeetings(meetingObj.teacher_id);

            res.status(200).json(arrayOfMeetings);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })
