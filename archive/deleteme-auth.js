const { Router } = require('express');
const Teacher = require('../lib/models/Teacher');
// const ensureAuth = require('../auth/ensure-auth');
const fetch = require('superagent');

const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomURL = process.env.ZOOM_URL

module.exports = Router()
    .post('/teacher', async (req, res, next) => {
        try {
            const authURL = precodeAccessUrl + req.body.code + postcodeAccessUrl;

            const returnedObject = await fetch
                .post(authURL)
                .set('Authorization', `Basic ${clientToken}`)

            const oauthToken = returnedObject.body.access_token;

            let returnedTeacherInfo = await fetch
                .get(zoomURL + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            const teacherExists = Teacher.findById(returnedTeacherInfo.body.id);

            if (!teacherExists) {
                const newTeacher = Teacher.parse(returnedTeacherInfo.body, oauthToken)
                res.json(newTeacher)
            }

            res.json(teacherExists)
        } catch (e) {

            res.json({ error: e });

        }
    })

    .post('/teacher/new', (req, res, next) => {
        try {
            const newTeacherObj = Teacher.insert(req.body)

        } catch (e) {

            res.json({ error: e });

        }
    })