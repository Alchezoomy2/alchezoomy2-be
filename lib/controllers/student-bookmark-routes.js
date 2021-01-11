const { Router } = require('express');
const Bookmark = require('../models/Bookmark.js');

module.exports = Router()
    .post('/bookmark', async (req, res) => {
        const bookmarkObj = req.body;
        try {
            await Bookmark.insert(bookmarkObj);
            const bookmarkArray = await Bookmark.findAll(bookmarkObj.studentId);

            res.status(200).json(bookmarkArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    })

    .get(`/bookmark/:id`, async (req, res) => {
        const studentId = req.params.id;
        try {
            const bookmarkArray = await Bookmark.findAll(studentId);
            res.status(200).json(bookmarkArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/bookmark/:id`, async (req, res) => {
        const bookmarkId = req.params.id;
        try {
            const bookmark = await Bookmark.delete(bookmarkId)
            const bookmarkArray = await Bookmark.findAll(bookmark.student_id);
            res.status(200).json(bookmarkArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })
