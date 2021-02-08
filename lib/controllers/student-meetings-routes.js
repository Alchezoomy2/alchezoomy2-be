const { Router } = require('express');
const Student = require('../models/Student.js');
const Meeting = require('../models/Meeting.js');
const ensureAuth = require('../auth/ensure-auth.js')


module.exports = Router()

    .get('/', ensureAuth, async (req, res) => {

        const studentId = req.user.id;

        try {
            const { permissions } = await Student.findById(studentId)

            const studentMeetingArray = await Student.meetingArray(permissions);

            res.status(200).json(studentMeetingArray);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })

    .get('/:id', ensureAuth, async (req, res) => {

        try {
            const meetingId = req.params.id;

            const meetingDetails = await Meeting.findById(meetingId);

            await Meeting.addView(meetingId);

            res.status(200).json(meetingDetails);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    // .put('/view/:id', ensureAuth, async (req, res) => {
    //     const meetingId = req.params.id;
    //     try {
    //         await Meeting.addView(meetingId);

    //         res.status(200).json({ status: 'success' })
    //     } catch (e) {
    //         res.status(500).json({ error: e.message })
    //     }
    // })

