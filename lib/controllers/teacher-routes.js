const { Router } = require('express');

const Teacher = require('../models/Teacher.js');
const teacherAuth = require('../auth/teacher-auth.js');
const logTeacherAuth = require('../utils/logTeacherAuth')


const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js');


const attachCookie = (res, user) => {
    res.cookie('session', teacherAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
    });
};

module.exports = Router()

    .post('/oauth', async (req, res, next) => {
        logTeacherAuth(req.headers);
        try {
            if (req.body.code) {
                const teacherInfo = await teacherAuth.authorize(req.body)
                logTeacherAuth(teacherInfo)
                attachCookie(res, { access_token: teacherInfo.access_token })
                delete teacherInfo.access_token;

                res.json(teacherInfo);
            } else {
                res.json({ error: "Could not authorize" })
            }
        } catch (e) {
            res.json({ error: e });
        }
    })

    .post('/new', ensureTeacherAuth, async (req, res, next) => {

        const newTeacherInfo = req.body.teacherInfo;
        try {
            const newTeacher = await Teacher.insert(newTeacherInfo)
            res.status(200).json(newTeacher);

        } catch (e) {
            res.json({ error: e });

        }
    })


