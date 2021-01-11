const { Router } = require('express');
const Student = require('../models/Student.js');
const Meeting = require('../models/Meeting.js');


module.exports = Router()

    .post('/', async (req, res) => {

        const studentInfo = req.body.student_info;

        try {
            const studentObj = await Student.findById(studentInfo.id)

            const studentMeetingArray = await Student.meetingArray(studentObj.permissions);

            res.status(200).json(studentMeetingArray);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })

    .get('/:id', async (req, res) => {

        try {
            const meetingId = req.params.id;

            const meetingDetails = await Meeting.findById(meetingId);

            res.status(200).json(meetingDetails);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .get('/view/:id', async (req, res) => {
        const meetingId = req.params.id;
        try {
            await Meeting.addView(meetingId);

            res.status(200).json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

