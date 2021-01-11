const { Router } = require('express');

const Favorite = require('../models/Favorite.js');


module.exports = Router()

    .post(`/`, async (req, res) => {
        const favoriteObj = req.body
        try {
            await Favorite.insert(favoriteObj);
            const favoriteArray = await Favorite.findAll(favoriteObj.studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .get(`/:id`, async (req, res) => {
        const studentId = req.params.id;
        try {
            const favoriteArray = await Favorite.findAll(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/:id`, async (req, res) => {
        const favoriteId = req.params.id;
        try {
            const deletedFavorite = await Favorite.delete(favoriteId);
            const favoriteArray = await Favorite.findAll(deletedFavorite.studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })