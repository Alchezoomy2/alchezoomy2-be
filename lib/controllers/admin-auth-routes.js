const { Router } = require('express');
const Admin = require("../models/Admin")

const ensureAdminAuth = require('../auth/ensure-admin-auth.js');

const attachCookie = (res, user) => {
    res.cookie('session', AdminAuth.authToken(user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true,
    })
};

module.exports = Router()


    .post('/auth', async (req, res, next) => {
        try {
            const userName = req.body.userName;
            const password = req.body.password;

            const response = await Admin.verify(userName, password);

            res.status(200).json(response);
        } catch (e) {
            res.json({ error: e });

        }
    })

    .post('/new', async (req, res, next) => {
        try {
            const userName = req.body.userName;
            const password = req.body.password;

            const response = await Admin.create(userName, password)

            res.status(200).json(response);
        } catch (e) {
            res.json({ error: e });

        }
    })

    .post('/password', async (req, res, next) => {
        try {
            const userName = req.body.userName;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const response = await Admin.changePassword(userName, oldPassword, newPassword);

            res.status(200).json(response);
        } catch (e) {
            res.json({ error: e });
        }
    })