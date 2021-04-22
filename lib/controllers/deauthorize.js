const { Router } = require('express');
const fetch = require('superagent');
const Teacher = require('../models/Teacher')

const client_id = process.env.ZOOM_CLIENT_ID
const clientToken = process.env.CLIENT_TOKEN
const verificationToken = process.env.ZOOM_VERIFICATION_TOKEN

module.exports = Router()
    .post('/', async (req, res) => {
        console.log("_+_+_+_+_+_+_+_+_+_+_+_+_+_+_")
        console.log('deauthorize!')
        const sentAuth = req.headers.authorization
        try {
            if (sentAuth === verificationToken) {
                console.log("match!")
                const payload = req.body.payload
                const compliance_completed = true;

                const teacherResponse = await Teacher.deauthorize(payload.user_id);
                console.log("🚀 ~ file: deauthorize.js ~ line 20 ~ .post ~ teacherResponse", teacherResponse)


                const requestBody = {
                    client_id,
                    user_id: payload.user_id,
                    account_id: payload.account_id,
                    deauthorization_event_recieved: payload,
                    compliance_completed
                }
                console.log("🚀 ~ file: deauthorize.js ~ line 24 ~ .post ~ requestBody", requestBody)

                const response = await fetch
                    .post('https://api.zoom.us/oauth/data/compliance')
                    .set('Authorization', `Basic ${clientToken}`)
                    .send(requestBody)
                console.log("🚀 ~ file: deauthorize.js ~ line 35 ~ .post ~ response", response.body)

                res.status(200).json(response.body)
            }
            res.status.json({ error: "error" })

        } catch (err) {
            res.json({ error: err })
        }

    })



