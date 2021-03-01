const { Router } = require('express');

const Subscription = require('../models/Subscription.js');
const InviteHash = require('../auth/invite-auth');

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
        try {
            const studentEmail = req.body.studentEmail;
            const teacherEmail = req.body.teacherEmail;

            const inviteHash = InviteHash.createToken(studentEmail, teacherEmail)
            const response = inviteStudent(studentEmail, teacherEmail, inviteHash)

            res.status(200).json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete('/:id', ensureTeacherAuth, async (req, res) => {
        try {
            const subscriptionId = req.params.id
            console.log(subscriptionId)
            console.log('/:id')
            const returnedInfo = await Subscription.deleteSubscription(subscriptionId);
            console.log(returnedInfo)

            const response = await Subscription.findByTeacherId(returnedInfo.teacherId);

            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })
