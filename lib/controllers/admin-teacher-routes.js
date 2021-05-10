const { Router } = require('express');
const Teacher = require("../models/Teacher")
const ensureAdminAuth = require('../auth/ensure-admin-auth')
const TeacherInviteHash = require('../auth/teacher-invite-auth');
const inviteTeacher = require('../utils/inviteTeacher')


module.exports = Router()

    .post('/', ensureAdminAuth, async (req, res) => {
        let response;
        try {
            const teacherEmailArray = req.body.teacherEmailArray;
            teacherEmailArray.forEach(teacherEmail => {
                const inviteHash = TeacherInviteHash.createToken(teacherEmail);
                response = inviteTeacher(teacherEmail, inviteHash)
            })
            res.json(response)
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .get('/', ensureAdminAuth, async (req, res) => {
        try {
            const teacherArray = await Teacher.findAll();

            res.json(teacherArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete('/:id', ensureAdminAuth, async (req, res) => {
        try {
            const teacherId = req.params.id;
            const deletedTeacher = await Teacher.delete(teacherId);

            const teacherArray = await Teacher.findAll()
            res.json(teacherArray)
        } catch (e) {
            res.json({ error: e.message })
        }
    })
