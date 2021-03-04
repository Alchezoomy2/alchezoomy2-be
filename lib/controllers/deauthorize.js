const { Router } = require('express');
const fetch = require('superagent');
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')

const client_id = process.env.ZOOM_CLIENT_ID
const clientToken = process.env.CLIENT_TOKEN
const verificationToken = process.env.ZOOM_VERIFICATION_TOKEN

module.exports = Router()
    .post('/', async (req, res) => {
        console.log('deauthorize!')
        const sentAuth = req.headers.authorization

        if (sentAuth === verificationToken) console.log("match!")
        const payload = req.body.payload
        const compliance_completed = true;

        const teacherResponse = await Teacher.delete(payload.user_id);
        console.log(teacherResponse)
        const studentResponse = await Student.delete(payload.user_id);
        console.log(studentResponse)

        const requestBody = {
            client_id,
            user_id: payload.user_id,
            account_id: payload.account_id,
            deauthorization_event_recieved: payload,
            compliance_completed
        }
        try {
            const response = await fetch
                .post('https://api.zoom.us/oauth/data/compliance')
                .set("authorization", `Basic ${clientToken}`)
                .send(requestBody)

            console.log(response.body)
            res.status(200).json(response.body)

        } catch (err) {
            res.status(500).json({ error: err.message })
        }

    })



