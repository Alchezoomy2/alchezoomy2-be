const { Router } = require('express');
const fetch = require('superagent');
const Student = require('../models/Student.js');

const parseReturnedStudentInfo = require('../utils/parseReturnedStudentInfo.js')

const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomUrl = process.env.ZOOM_URL

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
            const accessTokenUrl = precodeAccessUrl + req.body.code + postcodeAccessUrl;

            let returnedObject = await fetch
                .post(accessTokenUrl)
                .set('Authorization', `Basic ${clientToken}`);

            const oauthToken = returnedObject.body.access_token;

            let returnedStudentInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            const parsedStudentInfo = await parseReturnedStudentInfo(returnedStudentInfo.body, oauthToken);


            res.status(200).json(parsedStudentInfo);

        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', async (req, res) => {
        const newStudentInfo = req.body.student_info;

        try {
            const returnedStudentInfo = await Student.insert(newStudentInfo);


            res.status(200).json(returnedStudentInfo)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })


