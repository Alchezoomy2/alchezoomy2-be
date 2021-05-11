const { Router } = require('express');

const Teacher = require('../models/Teacher.js');
const Meeting = require('../models/Meeting')
const teacherAuth = require('../auth/teacher-auth.js');
const fetchColorPalette = require('../utils/fetchColorPalette');
const attachCookie = require('../utils/attachCookie')
const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js');
const InviteHash = require('../auth/teacher-invite-auth');
const parseReturnedTeacherInfo = require('../utils/parseReturnedTeacherInfo');

module.exports = Router()

    .post('/oauth', async (req, res, next) => {

        const { code } = req.body;

        try {
            if (code) {
                const { teacherObj, access_token, refresh_token } = await teacherAuth.authorize(code)

                const parsedTeacherInfo = await parseReturnedTeacherInfo(teacherObj, access_token, refresh_token)

                if (parsedTeacherInfo.message) {
                    res.json(teacherInfo);

                } else {
                    token_created = Date.now();

                    attachCookie(res, { access_token, refresh_token, token_created });

                    res.json(parsedTeacherInfo);
                }

            } else {
                res.json({ message: "Could not authorize" })
            }
        } catch (e) {
            res.json({ error: e.message });
        }
    })

    .post('/invite', ensureTeacherAuth, async (req, res, next) => {
        const { code, jwt } = req.body;
        try {

            const { teacherEmail } = InviteHash.verifyToken(jwt)
            const teacherInfo = await teacherAuth.authorizeNew(code);

            if (teacherInfo.message) {
                res.json(teacherInfo)

            } else if (teacherEmail === teacherInfo.email) {

                const { access_token, refresh_token, token_created } = teacherInfo;

                attachCookie(res, { access_token, refresh_token, token_created });
                delete teacherInfo.access_token;
                delete teacherInfo.refresh_token;
                delete teacherInfo.token_created;

                res.json(teacherInfo);
            } else {
                res.json({ message: "Error with teacher invite." })
            }

        } catch (e) {
            res.json({ errer: e.message })
        }
    })

    .post('/create', ensureTeacherAuth, async (req, res, next) => {

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
            const updatedMeetings = await Meeting.findAll(teacherId);
            res.json({ updatedTeacher, updatedMeetings })

        } catch (e) {
            res.json({ error: e })
        }
    })


