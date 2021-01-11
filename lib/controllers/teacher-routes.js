const { Router } = require('express');
const fetch = require('superagent');


const Teacher = require('../models/Teacher.js');
const Meeting = require('../models/Meeting.js');
// const parseReturnedTeacherInfo = require('../utils/parseReturnedTeacherInfo.js');
// const insertNewTeacher = require('../utils/old-insertNewTeacher.js');
// const loadNewMeetings = require('../utils/loadNewMeetings.js');
// const retrieveTeacherObj = require('../utils/old-retrieveTeacherObj.js');
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


            let returnedTeacherInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            const parsedTeacherInfo = await Teacher.checkExisting(returnedTeacherInfo.body, oauthToken);


            res.status(200).json(parsedTeacherInfo);

        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', async (req, res) => {

        const newTeacherInfo = req.body.teacher_info;
        try {
            const newTeacher = await Teacher.insert(newTeacherInfo)

            res.status(200).json(newTeacher);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })


    .post('/meetings', async (req, res) => {

        const teacherInfo = req.body.teacher_info;

        try {
            let returnedMeetingArray = await Meeting.retrieveFromZoom(teacherInfo);

            await Meeting.loadNewMeetings(returnedMeetingArray.meetings, teacherInfo);

            const completeMeetingList = await Meeting.findAll(teacherInfo.id);

            res.status(200).json(completeMeetingList);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/publish/', async (req, res) => {

        const meetingId = req.body.meetingId;
        const accessToken = req.body.access_token;

        try {
            const meetingObj = await Meeting.publish(meetingId, accessToken);
            // const meetingObj = await publishMeeting(meetingId, accessToken);

            // const arrayOfMeetings = await retrieveAllMeetings(meetingObj.teacher_id);

            // res.status(200).json(arrayOfMeetings);

            const completeMeetingList = await Meeting.findAll(meetingObj.teacher_id);

            res.status(200).json(completeMeetingList);


        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/unpublish/', async (req, res) => {

        const meetingId = req.body.meetingId;

        try {
            const meetingObj = await Meeting.unpublish(meetingId);

            const arrayOfMeetings = await Meeting.findAll(meetingObj.teacher_id);

            res.status(200).json(arrayOfMeetings);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })
