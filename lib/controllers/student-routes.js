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
            const studentInfo = Student.login(studentEmail, password);
            if (returnedStudentInfo) {
                attachCookie(res, { email: returnedStudentInfo.student_email })
            }
            res.json(studentInfo);

        } catch (e) {

            res.json({ error: e });

        }
    })

    .post('/new', ensureStudentAuth, async (req, res) => {
        const newStudentInfo = req.body.studentInfo;

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
            console.log("🚀 ~ file: student-routes.js ~ line 53 ~ .post ~ studentEmail", studentEmail)
            const teacherEmail = req.body.teacherEmail;
            console.log("🚀 ~ file: student-routes.js ~ line 54 ~ .post ~ teacherEmail", teacherEmail)

            const response = InviteHash.verifyToken(JWT)
            console.log("🚀 ~ file: student-routes.js ~ line 58 ~ .post ~ response", response)

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

            const student = Student.findByEmail(studentEmail)

            if (student === null) {
                res.json({ status: 'new', studentEmail, teacherEmail })
            } else {
                const studentId = await Subscription.insert(response)
                res.json({ status: 'exisiting' })
            }

        } catch (e) {
            res.json({ error: e.message })
        }
    })

