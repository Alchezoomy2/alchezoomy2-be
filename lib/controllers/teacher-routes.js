const { Router } = require('express');

const Teacher = require('../models/Teacher.js');
const Meeting = require('../models/Meeting.js');
const teacherAuth = require('../auth/teacher-auth.js');

const parseReturnedTeacherInfo = require('../utils/parseReturnedTeacherInfo.js')

const attachCookie = (res, user) => {
    res.cookie('session', teacherAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production'
    });
};

// const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
// const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
// const clientToken = process.env.CLIENT_TOKEN
// const zoomUrl = process.env.ZOOM_URL

module.exports = Router()

    .post('/oauth', async (req, res) => {
        try {
            const teacherInfo = teacherAuth.authorize(req.body)
            console.log(teacherInfo)
            attachCookie(res, teacherInfo)
            res.send(teacherInfo)


            // const accessTokenUrl = precodeAccessUrl + req.body.code + postcodeAccessUrl;

            // let returnedObject = await fetch
            //     .post(accessTokenUrl)
            //     .set('Authorization', `Basic ${clientToken}`);

            // const oauthToken = returnedObject.body.access_token;


            // let returnedTeacherInfo = await fetch
            //     .get(zoomUrl + 'users/me')
            //     .set('Authorization', 'Bearer ' + oauthToken);

            // const parsedTeacherInfo = await parseReturnedTeacherInfo(returnedTeacherInfo.body, oauthToken);


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
