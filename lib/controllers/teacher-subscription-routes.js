const { Router } = require('express');

const Subscription = require('../models/Subscription.js');
const Teacher = require('../models/Teacher.js');
const InviteHash = require('../auth/student-invite-auth');

const inviteStudent = require('../utils/inviteStudent.js')

const ensureTeacherAuth = require('../auth/ensure-teacher-auth.js')

module.exports = Router()

    .get('/:id', ensureTeacherAuth, async (req, res) => {
        try {
            const teacherId = req.params.id;

            const response = await Subscription.findByTeacherId(teacherId);

            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .post('/', ensureTeacherAuth, (req, res) => {
        let response;
        try {
            const studentEmailArray = req.body.studentEmailArray;
            const teacherEmail = req.body.teacherEmail;
            console.log(req.user)
            const { userName } = Teacher.findById(req.user.id)
            console.log(userName)
            studentEmailArray.forEach(studentEmail => {
                const inviteHash = InviteHash.createToken(studentEmail, teacherEmail)
                response = inviteStudent(studentEmail, inviteHash, userName)
            })

            res.json(response)
        } catch (e) {
            res.json({ error: e.message })
        }
    })

    .delete('/:id', ensureTeacherAuth, async (req, res) => {
        try {
            const subscriptionId = req.params.id;

            const { teacherId } = await Subscription.deleteSubscription(subscriptionId);

            const response = await Subscription.findByTeacherId(teacherId);

            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })
