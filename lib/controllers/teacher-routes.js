const { Router } = require('express');

const Teacher = require('../models/Teacher.js');
const Meeting = require('../models/Meeting')
const teacherAuth = require('../auth/teacher-auth.js');
// const logTeacherAuth = require('../utils/logTeacherAuth');
const fetchColorPalette = require('../utils/fetchColorPalette');
const attachCookie = require('../utils/attachCookie')
const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js');


module.exports = Router()

    .post('/oauth', async (req, res, next) => {
        try {
            if (req.body.code) {
                const teacherInfo = await teacherAuth.authorize(req.body)

                const { access_token, refresh_token, token_created } = teacherInfo;

                attachCookie(res, { access_token, refresh_token, token_created });
                delete teacherInfo.access_token;
                delete teacherInfo.refresh_token;
                delete teacherInfo.token_created;

                res.json(teacherInfo);

            } else {
                res.json({ error: "Could not authorize" })
            }
        } catch (e) {
            res.json({ error: e.message });
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

    .post('/color', ensureTeacherAuth, async (req, res, next) => {

        const picUrl = req.body.picUrl;

        try {
            const hexPalette = await fetchColorPalette(picUrl);

            res.json({ hexPalette });
        } catch (e) {
            res.json({ error: e })
        }
    })

    .put('/color/:id', ensureTeacherAuth, async (req, res, next) => {
        const newColor = req.body.newColor;
        const teacherId = req.params.id;

        try {
            const updatedTeacher = await Teacher.updateColor(teacherId, newColor);
            console.log("🚀 ~ file: teacher-routes.js ~ line 72 ~ .put ~ updatedTeacher ", updatedTeacher)
            const updatedMeetings = await Meeting.findAll(teacherId);
            console.log("🚀 ~ file: teacher-routes.js ~ line 74 ~ .put ~ updatedMeetings", updatedMeetings)
            res.json({ updatedTeacher, updatedMeetings })

        } catch (e) {
            res.json({ error: e })
        }
    })


