const { Router } = require('express');

const Favorite = require('../models/Favorite.js');
const ensureAuth = require('../auth/ensure-auth.js')


module.exports = Router()

    .post(`/`, ensureAuth, async (req, res) => {
        const favoriteObj = req.body
        const studentId = req.user.id
        try {
            await Favorite.insert(favoriteObj);
            const favoriteArray = await Favorite.findAll(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .get(`/`, ensureAuth, async (req, res) => {
        const studentId = req.user.id;
        try {
            const favoriteArray = await Favorite.findAll(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/:id`, ensureAuth, async (req, res) => {
        const favoriteId = req.params.id;
        try {
            const deletedFavorite = await Favorite.delete(favoriteId);
            const favoriteArray = await Favorite.findAll(deletedFavorite.studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })