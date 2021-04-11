const { Router } = require('express');
// const fetch = require('superagent');
const Student = require('../models/Student.js');
const Subscription = require('../models/Subscription.js');

const studentAuth = require('../auth/student-auth.js')
const ensureStudentAuth = require('../auth/ensure-student-auth.js')
const InviteHash = require('../auth/student-invite-auth')

const attachCookie = (res, user) => {
    res.cookie('session', studentAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true
    });
};

module.exports = Router()

    .post('/auth', async (req, res) => {
        const { studentEmail, password } = req.body;
        try {
            const returnedStudentInfo = await Student.login(studentEmail, password);

            if (returnedStudentInfo) {
                attachCookie(res, returnedStudentInfo)

                res.json(returnedStudentInfo);
            }
            else {
                res.status(404).json({ message: "email and password combination is invalid" })
            }

        } catch (e) {

            res.json({ error: e });

        }
    })

    .post('/new', async (req, res) => {
        const newStudentInfo = req.body;

        try {
            const returnedStudentInfo = await Student.insert(newStudentInfo);

            attachCookie(res, { email: returnedStudentInfo.student_email })

            res.json(returnedStudentInfo)
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .post('/invite', ensureStudentAuth, async (req, res) => {

        try {
            const JWT = req.body.JWT;
            const studentEmail = req.body.studentEmail;
            const teacherEmail = req.body.teacherEmail;

            const response = InviteHash.verifyToken(JWT)

            if (response.studentEmail === studentEmail) {
                const studentId = await Subscription.insert(response)

                const returnedMeetingArray = await Student.meetingArray(studentId)

                res.status(200).json(returnedMeetingArray)
            } else {
                res.status(500).json({ error: "Invite email doesn't match student email." })
            }

        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    })

    .post('/exists/', async (req, res) => {
        try {
            const JWT = req.body.jwt;
            const { studentEmail, teacherEmail } = InviteHash.verifyToken(JWT);

            const student = await Student.findByEmail(studentEmail)

            if (student === null) {
                res.json({ status: 'new', studentEmail, teacherEmail })
            } else {
                const studentId = await Subscription.insert({ studentEmail, teacherEmail })
                res.json({ status: 'existing' })
            }

        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .patch('/user/:id', ensureStudentAuth, async (req, res) => {
        try {

            const studentId = req.params.id;
            const payload = req.body;
            let response = { message: "problem with the payload" };
            if (payload.newPassword1) {
                response = await Student.changePassword(studentId, payload);
            } else if (payload.newFirstName) {
                console.log(payload)
                response = await Student.changeFirstName(studentId, payload);
                console.log("🚀 ~ file: student-routes.js ~ line 110 ~ .patch ~ response", response)

            }
            res.json(response)

        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete('/:id', ensureStudentAuth, async (req, res) => {
        try {
            const studentId = req.params.id;
            const password = req.body.password;
            console.log("🚀 ~ file: student-routes.js ~ line 125 ~ .delete ~ password ", password)

            const response = await Student.delete(studentId, password);

            res.json(response)
        } catch (e) {
            res.json({ error: e.message })
        }
    })