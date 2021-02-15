const { Router } = require('express');
// const fetch = require('superagent');
const Student = require('../models/Student.js');
const studentAuth = require('../auth/student-auth.js')
const ensureStudentAuth = require('../auth/ensure-student-auth.js')


const attachCookie = (res, user) => {
    res.cookie('session', studentAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true
    });
};

module.exports = Router()

    .post('/oauth', async (req, res) => {
        try {
            const parsedStudentInfo = await studentAuth.authorize(req.body);
            attachCookie(res, { id: parsedStudentInfo.id })

            res.status(200).json(parsedStudentInfo);
        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', ensureStudentAuth, async (req, res) => {
        const newStudentInfo = req.body.studentInfo;

        try {
            const returnedStudentInfo = await Student.insert(newStudentInfo);
            attachCookie(res, { id: parsedStudentInfo.id })

            res.status(200).json(returnedStudentInfo)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })


