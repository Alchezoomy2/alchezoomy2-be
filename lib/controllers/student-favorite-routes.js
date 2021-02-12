const { Router } = require('express');

const Favorite = require('../models/Favorite.js');
const ensureStudentAuth = require('../auth/ensure-student-auth.js')


module.exports = Router()

    .post(`/`, ensureStudentAuth, async (req, res) => {
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

    .get(`/`, ensureStudentAuth, async (req, res) => {
        const studentId = req.user.id;
        try {
            const favoriteArray = await Favorite.findAll(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/:id`, ensureStudentAuth, async (req, res) => {
        const favoriteId = req.params.id;
        try {
            const deletedFavorite = await Favorite.delete(favoriteId);
            console.log(deletedFavorite)
            const favoriteArray = await Favorite.findAll(deletedFavorite.student_id)
            console.log(favoriteArray)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })