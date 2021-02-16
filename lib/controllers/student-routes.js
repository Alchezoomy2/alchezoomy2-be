const { Router } = require('express');
// const fetch = require('superagent');
const Student = require('../models/Student.js');
const studentAuth = require('../auth/student-auth.js')
const ensureStudentAuth = require('../auth/ensure-student-auth.js')
const InviteHash = require('../auth/invite-auth')


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

    .post('/invite', ensureStudentAuth, async (req, res) => {

        try {
            const JWT = req.body.JWT;
            const studentEmail = req.body.studentEmail;

            const response = InviteHash.verifyToken(JWT)

            if (response.student === studentEmail) {
                const returnedPermissions = await Student.addPermission(response)

                const returnedMeetingArray = await Student.meetingArray(returnedPermissions)

                res.status(200).json(returnedMeetingArray)
            } else {
                res.status(500).json({ error: "Invite email doesn't match student email." })
            }


        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    })


