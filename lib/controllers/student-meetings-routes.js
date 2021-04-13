const { Router } = require('express');
const Student = require('../models/Student.js');
const Meeting = require('../models/Meeting.js');
const ensureStudentAuth = require('../auth/ensure-student-auth.js')


module.exports = Router()

    .get('/', ensureStudentAuth, async (req, res) => {

        console.log("🚀 ~ file: student-meetings-routes.js ~ line 12 ~ .get ~ req.user", req.user)
        const studentId = req.user.student.id;

        try {
            const studentMeetingArray = await Student.meetingArray(studentId);
            console.log("🚀 ~ file: student-meetings-routes.js ~ line 14 ~ .get ~ studentMeetingArray", studentMeetingArray)

            res.json(studentMeetingArray);
        } catch (e) {
            res.json({ error: e });

        }

    })

    .get('/:id', ensureStudentAuth, async (req, res) => {

        try {
            const meetingId = req.params.id;

            const meetingDetails = await Meeting.findById(meetingId);

            await Meeting.addView(meetingId);

            res.status(200).json(meetingDetails);
        } catch (e) {
            res.json({ error: e });

        }
    })

