const { Router } = require('express');

const Favorite = require('../models/Favorite.js');
const ensureStudentAuth = require('../auth/ensure-student-auth.js')


module.exports = Router()

    .post(`/`, ensureStudentAuth, async (req, res) => {
        const favoriteObj = req.body
        const studentId = req.user.id
        try {
            await Favorite.insert(favoriteObj, studentId);
            const favoriteArray = await Favorite.findAll(studentId)

            res.json(favoriteArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .get(`/`, ensureStudentAuth, async (req, res) => {
        const studentId = req.user.id;
        try {
            const favoriteArray = await Favorite.findAll(studentId)

            res.json(favoriteArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete(`/:id`, ensureStudentAuth, async (req, res) => {
        const favoriteId = req.params.id;
        try {
            const deletedFavorite = await Favorite.delete(favoriteId);
            const favoriteArray = await Favorite.findAll(deletedFavorite.studentId)

            res.json(favoriteArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })