const { Router } = require('express');
// const fetch = require('superagent');
const Student = require('../models/Student.js');
const studentAuth = require('../auth/student-auth.js')

// const parseReturnedStudentInfo = require('../utils/parseReturnedStudentInfo.js')

// const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
// const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
// const clientToken = process.env.CLIENT_TOKEN
// const zoomUrl = process.env.ZOOM_URL

const attachCookie = (res, user) => {
    res.cookie('session', UserService.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
    });
};

module.exports = Router()

    .post('/oauth', async (req, res) => {
        try {
            const parsedStudentInfo = await studentAuth.authorize(req.body);
            await attachCookie(res, { id: parsedStudentInfo.id })

            res.status(200).json(parsedStudentInfo);
        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', ensureAuth, async (req, res) => {
        const newStudentInfo = req.body.student_info;

        try {
            const returnedStudentInfo = await Student.insert(newStudentInfo);

            res.status(200).json(returnedStudentInfo)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })


