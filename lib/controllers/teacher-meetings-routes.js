const { Router } = require('express');

const Meeting = require('../models/Meeting.js');
const updateZoomInfo = require('../utils/updateZoomInfo')
const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js');
const refreshToken = require('../utils/refreshToken.js');
const attachCookie = require('../utils/attachCookie')

module.exports = Router()

    .post('/', ensureTeacherAuth, async (req, res, next) => {

        const teacherInfo = req.body.teacherInfo;
        try {
            let returnedMeetingArray = await Meeting.retrieveFromZoom(teacherInfo, req.user.access_token);

            if (returnedMeetingArray.meetings.length > 0) {

                await Meeting.loadNewMeetings(returnedMeetingArray.meetings, teacherInfo);

                const completeMeetingList = await Meeting.findAll(teacherInfo.id);

                res.status(200).json(completeMeetingList);
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
        // const { refresh_token, token_created } = req.user;
        // let access_token = req.user.access_token;

        try {
            const { access_token, refresh_token, token_created } = await refreshToken(cookie);
            // console.log("🚀 ~ file: teacher-meetings-routes.js ~ line 42 ~ .post ~ access_token, refresh_token, token_created", access_token, refresh_token, token_created)

            attachCookie(res, {
                access_token,
                refresh_token,
                token_created
            })

            const meetingObj = await Meeting.publish(meetingId, access_token);
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
        const cookie = req.user;
        x
        try {
            const { access_token, refresh_token, token_created } = await refreshToken(cookie);

            attachCookie(res, {
                access_token,
                refresh_token,
                token_created
            })

            const zoomMeetingId = await Meeting.fetchZoomMeetingId(meetingObj.id)

            await updateZoomInfo(access_token, zoomMeetingId, meetingObj.topic);

            const updatedMeetingObj = await Meeting.updateLocally(meetingId, meetingObj);

            const arrayOfMeetings = await Meeting.findAll(updatedMeetingObj.teacherId);

            res.status(200).json(arrayOfMeetings);
        } catch (e) {
            res.json({ error: e });
        }
    })