const { Router } = require('express');

const Meeting = require('../models/Meeting.js');

const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js')

module.exports = Router()

    .post('/', ensureTeacherAuth, async (req, res, next) => {

        const teacherInfo = req.body.teacherInfo;
        try {
            let returnedMeetingArray = await Meeting.retrieveFromZoom(teacherInfo, req.user.access_token);

            await Meeting.loadNewMeetings(returnedMeetingArray.meetings, teacherInfo);

            const completeMeetingList = await Meeting.findAll(teacherInfo.id);

            res.status(200).json(completeMeetingList);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .post('/publish/:id', ensureTeacherAuth, async (req, res) => {
        console.log("PUBLISH!")
        const meetingId = req.params.id;
        const accessToken = req.user.access_token;

        try {
            const meetingObj = await Meeting.publish(meetingId, accessToken);
            const completeMeetingList = await Meeting.findAll(meetingObj.teacherId);

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

    .put('/update/:id', ensureTeacherAuth, async (req, res) => {
        const meetingId = req.params.id;
        const meetingObj = req.body.meetingInfo;

        try {
            const updatedMeetingObj = await Meeting.update(meetingId, meetingObj);

            const arrayOfMeetings = await Meeting.findAll(updatedMeetingObj.teacherId);

            res.status(200).json(arrayOfMeetings);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })