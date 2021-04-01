const { Router } = require('express');

const Meeting = require('../models/Meeting.js');
const updateZoomInfo = require('../utils/updateZoomInfo')
const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js');

module.exports = Router()

    .post('/', ensureTeacherAuth, async (req, res, next) => {

        const teacherInfo = req.body.teacherInfo;
        try {
            let returnedMeetingArray = await Meeting.retrieveFromZoom(teacherInfo, req.user.access_token);

            await Meeting.loadNewMeetings(returnedMeetingArray.meetings, teacherInfo);

            const completeMeetingList = await Meeting.findAll(teacherInfo.id);

            res.status(200).json(completeMeetingList);

        } catch (e) {
            res.json({ error: e });

        }
    })

    .post('/publish/:id', ensureTeacherAuth, async (req, res) => {
        const meetingId = req.params.id;
        const accessToken = req.user.access_token;

        try {
            const meetingObj = await Meeting.publish(meetingId, accessToken);
            const completeMeetingList = await Meeting.findAll(meetingObj.teacherId);

            res.status(200).json(completeMeetingList);
        } catch (e) {
            res.json({ error: e });

        }
    })

    .post('/unpublish/:id', ensureTeacherAuth, async (req, res) => {

        const meetingId = req.params.id;

        try {
            const meetingObj = await Meeting.unpublish(meetingId);

            const arrayOfMeetings = await Meeting.findAll(meetingObj.teacherId);

            res.status(200).json(arrayOfMeetings);

        } catch (e) {
            res.json({ error: e });

        }

    })

    .put('/update/:id', ensureTeacherAuth, async (req, res) => {
        const meetingId = req.params.id;
        const meetingObj = req.body.meetingInfo;
        const accessToken = req.user.access_token;

        try {
            // const zoomResponse = await updateZoomInfo(accessToken, meetingObj);

            const updatedMeetingObj = await Meeting.updateLocally(meetingId, meetingObj);

            const arrayOfMeetings = await Meeting.findAll(updatedMeetingObj.teacherId);

            res.status(200).json(arrayOfMeetings);
        } catch (e) {
            res.json({ error: e });
        }
    })