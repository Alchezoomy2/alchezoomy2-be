const { Router } = require('express');
const Teacher = require("../models/Teacher")
const ensureAdminAuth = require('../auth/ensure-admin-auth')
const TeacherInviteHash = require('../auth/teacher-invite-auth');


module.exports = Router()

    .post('/', ensureAdminAuth, async (req, res) => {
        let response;
        try {
            const teacherEmailArray = req.body.teacherEmailArray;
            teacherEmailArray.forEach(teacherEmail => {
                const inviteHash = TeacherInviteHash.createToken();
                response = inviteTeacher(teacherEmail, inviteHash)
            })
            res.json(response)
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .get('/', ensureAdminAuth, async (req, res) => {
        try {
            const teacherArray = Teacher.findAll();
            console.log("🚀 ~ file: admin-teacher-routes.js ~ line 26 ~ .get ~ teacherArray ", teacherArray)

            res.json(teacherArray);
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete('/:id', ensureAdminAuth, async (req, res) => {
        try {
            const teacherId = req.params.id;
            const response = await Teacher.delete(teacherId);

            res.json(response)
        } catch (e) {
            res.json({ error: e.message })
        }
    })
