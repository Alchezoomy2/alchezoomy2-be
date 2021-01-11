const { Router } = require('express');
const fetch = require('superagent');
const Student = require('../models/Student.js');
const Meeting = require('../models/Meeting.js');
const Bookmark = require('../models/Bookmark.js');
const Favorite = require('../models/Favorite.js');


const parseReturnedStudentInfo = require('../utils/parseReturnedStudentInfo.js')

const precodeAccessUrl = process.env.PRECODE_ACCESS_URL
const postcodeAccessUrl = process.env.POSTCODE_ACCESS_URL
const clientToken = process.env.CLIENT_TOKEN
const zoomUrl = process.env.ZOOM_URL


module.exports = Router()

    .post('/oauth', async (req, res) => {

        try {
            const accessTokenUrl = precodeAccessUrl + req.body.code + postcodeAccessUrl;

            let returnedObject = await fetch
                .post(accessTokenUrl)
                .set('Authorization', `Basic ${clientToken}`);

            const oauthToken = returnedObject.body.access_token;

            let returnedStudentInfo = await fetch
                .get(zoomUrl + 'users/me')
                .set('Authorization', 'Bearer ' + oauthToken);

            const parsedStudentInfo = await parseReturnedStudentInfo(returnedStudentInfo.body, oauthToken);


            res.status(200).json(parsedStudentInfo);

        } catch (e) {

            res.status(500).json({ error: e.message });
        }
    })

    .post('/new', async (req, res) => {
        const newStudentInfo = req.body.student_info;

        try {
            const returnedStudentInfo = await Student.insert(newStudentInfo);


            res.status(200).json(returnedStudentInfo)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .post('/meetings', async (req, res) => {

        const studentInfo = req.body.student_info;
        console.log(studentInfo.id)
        try {
            const studentObj = await Student.findById(studentInfo.id)

            const studentMeetingArray = await Student.meetingArray(studentObj.permissions);

            res.status(200).json(studentMeetingArray);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    })

    .get('/meetings/:id', async (req, res) => {

        try {
            const meetingId = req.params.id;

            const meetingDetails = await Meeting.findById(meetingId);

            res.status(200).json(meetingDetails);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    })

    .get('/view/:id', async (req, res) => {
        const meetingId = req.params.id;
        try {
            await Meeting.addView(meetingId);

            res.status(200).json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })


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

    .post(`/favorite`, async (req, res) => {
        const favoriteObj = req.body
        try {
            await Favorite.insert(favoriteObj);
            const favoriteArray = await Favorite.findAll(favoriteObj.studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .get(`/favorite/:id`, async (req, res) => {
        const studentId = req.params.id;
        try {
            const favoriteArray = await Favorite.findAll(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })

    .delete(`/favorite/:id`, async (req, res) => {
        const favoriteId = req.params.id;
        try {
            const studentId = await Favorite.delete(favoriteId);
            const favoriteArray = await Favorite.findAll(studentId)

            res.status(200).json(favoriteArray);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    })