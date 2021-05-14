const { Router } = require('express');

const Meeting = require('../models/Meeting.js');
const updateZoomInfo = require('../utils/updateZoomInfo')
const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js');
const refreshToken = require('../utils/refreshToken.js');
const attachCookie = require('../utils/attachCookie')
const fetchSingleMeeting = require('../utils/fetchSingleMeeting');
const parseMeetingObj = require('../utils/parseMeetingObj')

module.exports = Router()

    .post('/', ensureTeacherAuth, async (req, res, next) => {

        const teacherInfo = req.body.teacherInfo;
        const cookie = req.user;

        try {
            const { access_token, refresh_token, token_created } = await refreshToken(cookie);

            attachCookie(res, { access_token, refresh_token, token_created })

            let returnedMeetingArray = await Meeting.retrieveFromZoom(teacherInfo, access_token);

            if (returnedMeetingArray.meetings.length > 0) {

                await Meeting.loadNewMeetings(returnedMeetingArray.meetings, teacherInfo);

                const completeMeetingList = await Meeting.findAll(teacherInfo.id);

                res.json(completeMeetingList);
            } else {
                res.json([])
            }

        } catch (e) {
            res.json({ error: e });

        }
    })

    .post('/publish/:id', ensureTeacherAuth, async (req, res) => {
        const meetingId = req.params.id;
        const cookie = req.user;

        try {
            const { access_token, refresh_token, token_created } = await refreshToken(cookie);

            attachCookie(res, { access_token, refresh_token, token_created })

            const meetingObj = await Meeting.publish(meetingId, access_token);
            const completeMeetingList = await Meeting.findAll(meetingObj.teacherId);

            res.json(completeMeetingList);
        } catch (e) {
            res.json({ error: e.message });

        }
    })

    .post('/unpublish/:id', ensureTeacherAuth, async (req, res) => {

        const meetingId = req.params.id;

        try {
            const meetingObj = await Meeting.unpublish(meetingId);

            const arrayOfMeetings = await Meeting.findAll(meetingObj.teacherId);

            res.json(arrayOfMeetings);

        } catch (e) {
            res.json({ error: e });

        }

    })

    .put('/update/:id', ensureTeacherAuth, async (req, res) => {
        const meetingId = req.params.id;
        const meetingObj = req.body.meetingInfo;
        const cookie = req.user;

        try {
            const { access_token, refresh_token, token_created } = await refreshToken(cookie);

            attachCookie(res, { access_token, refresh_token, token_created })

            const zoomMeetingId = await Meeting.fetchZoomMeetingId(meetingObj.id)

            await updateZoomInfo(access_token, zoomMeetingId, meetingObj.topic);

            const updatedMeetingObj = await Meeting.updateLocally(meetingId, meetingObj);

            const arrayOfMeetings = await Meeting.findAll(updatedMeetingObj.teacherId);

            res.json(arrayOfMeetings);
        } catch (e) {
            res.json({ error: e });
        }
    })

    .post('/refresh/:id', ensureTeacherAuth, async (req, res) => {
        const meetingId = req.params.id;
        const { teacherInfo } = req.body;
        const cookie = req.user;
        try {
            const { access_token, refresh_token, token_created } = await refreshToken(cookie);

            attachCookie(res, { access_token, refresh_token, token_created });

            const zoom_meeting_id = await Meeting.fetchZoomMeetingId(meetingId);

            const currentMeetingObj = await fetchSingleMeeting(access_token, zoom_meeting_id);

            const parsedMeetingObj = await parseMeetingObj(currentMeetingObj, teacherInfo);

            await Meeting.refreshMeetingInfo(meetingId, parsedMeetingObj);

            const arrayOfMeetings = await Meeting.findAll(parsedMeetingObj.teacherId);

            res.json(arrayOfMeetings);
        } catch (error) {
            res.status(401).json(error);
        }
    })