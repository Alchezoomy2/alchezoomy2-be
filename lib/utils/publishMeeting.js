const client = require('../client.js');
const insertNewTranscript = require('./insertNewTranscript.js');
const insertNewChat = require('./insertNewChat');
// const S3Upload = require('./S3Upload.js');
const multer = require('multer');
// const fetch = require('superagent')

const { signup } = S3Upload;
module.exports = async (meetingId, accessToken) => {

    const returnedMeetingObj = await client.query(`
    UPDATE meetings
    SET published = true
    WHERE id = $1
    RETURNING *`,
        [meetingId]);

    const meetingObj = returnedMeetingObj.rows[0];

    if (meetingObj.chat_url) {
        await insertNewChat(meetingObj, meetingId, accessToken);
    }

    if (meetingObj.transcript_url) {
        await insertNewTranscript(meetingObj, meetingId, accessToken);
    }

    multer({ dest: 'temp/' }).single('test'), signup
    return meetingObj;
}
