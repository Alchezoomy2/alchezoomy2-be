const { Router } = require('express');
const ensureAdminAuth = require('../auth/ensure-admin-auth')
const fs = require('fs')

module.exports = Router()

    .get('/', ensureAdminAuth, async (req, res) => {
        try {
            const S3Raw = fs.readFileSync('./config.json')
            const S3Obj = JSON.parse(S3Raw)
            delete S3Obj.secretAccessKey
            res.json(S3Obj);
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .put('/', ensureAdminAuth, async (req, res) => {
        try {
            const newS3Obj = req.body.newS3Obj;
            const S3String = JSON.stringify(newS3Obj);
            fs.writeFileSync('./config.json', S3String)
            res.json(newS3Obj)
        } catch (e) {
            res.json({ error: e.message })
        }
    })