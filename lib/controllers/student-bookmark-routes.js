const { Router } = require('express');
const Bookmark = require('../models/Bookmark.js');

const ensureStudentAuth = require('../auth/ensure-student-auth.js')

module.exports = Router()
    .post('/', ensureStudentAuth, async (req, res) => {
        const bookmarkObj = req.body;
        const studentId = req.user.id
        try {
            await Bookmark.insert(bookmarkObj, studentId);
            const bookmarkArray = await Bookmark.findAll(studentId);

            res.json(bookmarkArray);
        } catch (e) {
            res.json({ error: e.message })
        }

    })

    .get(`/`, ensureStudentAuth, async (req, res) => {
        const studentId = req.user.id;
        try {
            const bookmarkArray = await Bookmark.findAll(studentId);

            res.json(bookmarkArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete(`/:id`, ensureStudentAuth, async (req, res) => {
        const bookmarkId = req.params.id;
        const studentId = req.user.id
        try {
            await Bookmark.delete(bookmarkId)
            const bookmarkArray = await Bookmark.findAll(studentId);
            res.json(bookmarkArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })
