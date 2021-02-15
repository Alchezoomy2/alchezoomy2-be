const { Router } = require('express');

const Teacher = require('../models/Teacher.js');
const Meeting = require('../models/Meeting.js');
const teacherAuth = require('../auth/teacher-auth.js');

const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js')

const attachCookie = (res, user) => {
    res.cookie('session', teacherAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
        // domain: 'alchezoomy.com'
    });
};

module.exports = Router()

    .post('/oauth', async (req, res, next) => {
        try {
            const teacherInfo = await teacherAuth.authorize(req.body)

            attachCookie(res, { access_token: teacherInfo.access_token })
            delete teacherInfo.access_token;

            res.status(200).json(teacherInfo);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', ensureTeacherAuth, async (req, res, next) => {

        const newTeacherInfo = req.body.teacherInfo;
        try {
            const newTeacher = await Teacher.insert(newTeacherInfo)
            console.log(newTeacher)
            res.status(200).json(newTeacher);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/meetings', ensureTeacherAuth, async (req, res, next) => {

        const teacherInfo = req.body.teacherInfo;

        try {
            let returnedMeetingArray = await Meeting.retrieveFromZoom(teacherInfo, req.user.access_token);
            console.log(returnedMeetingArray)
            await Meeting.loadNewMeetings(returnedMeetingArray.meetings, teacherInfo);

            const completeMeetingList = await Meeting.findAll(teacherInfo.id);

            res.status(200).json(completeMeetingList);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/publish/:id', ensureTeacherAuth, async (req, res) => {

        const meetingId = req.params.id;
        const accessToken = req.user.access_token;

        try {
            const meetingObj = await Meeting.publish(meetingId, accessToken);

            const completeMeetingList = await Meeting.findAll(meetingObj.teacherIid);

            res.status(200).json(completeMeetingList);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/unpublish/:id', ensureTeacherAuth, async (req, res) => {

        const meetingId = req.params.id;

        try {
            const meetingObj = await Meeting.unpublish(meetingId);

            const arrayOfMeetings = await Meeting.findAll(meetingObj.teacherId);

            res.status(200).json(arrayOfMeetings);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })
