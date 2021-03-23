const { Router } = require('express');
const Student = require("../models/Student")
const ensureAdminAuth = require('../auth/ensure-admin-auth')

module.exports = Router()

    .get('/', ensureAdminAuth, async (req, res) => {
        try {
            const studentArray = await Student.findAll();

            res.json(studentArray)
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete('/:id', ensureAdminAuth, async (req, res) => {
        try {
            const studentId = req.params.id
            const deletedStudent = await Student.delete(studentId)
            const studentArray = await Student.findAll();
            res.json(studentArray)
        } catch (e) {
            res.json({ error: e.message })
        }
    })