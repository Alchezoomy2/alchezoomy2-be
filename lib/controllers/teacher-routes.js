const { Router } = require('express');

const Teacher = require('../models/Teacher.js');
const Meeting = require('../models/Meeting.js');
const teacherAuth = require('../auth/teacher-auth.js');

const ensureAuth = require('../auth/ensure-auth.js')

const attachCookie = (res, user) => {
    res.cookie('session', teacherAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
        domain: 'alchezoomy.com'
    });
};

module.exports = Router()

    .post('/oauth', async (req, res, next) => {
        try {
            const teacherInfo = await teacherAuth.authorize(req.body)
            await attachCookie(res, teacherInfo)
            res.status(200).json(teacherInfo);

        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', async (req, res, next) => {

        const newTeacherInfo = req.body.teacher_info;
        try {
            const newTeacher = await Teacher.insert(newTeacherInfo)

            res.status(200).json(newTeacher);
            next();
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })


    .post('/meetings', ensureAuth, async (req, res, next) => {
        console.log('///---------------------')
        console.log('req.body')
        console.log(req.body)
        console.log('///---------------------')

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
