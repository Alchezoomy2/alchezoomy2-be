const client = require('../client.js');
const insertNewTranscript = require('./insertNewTranscript.js');
const insertNewChat = require('./insertNewChat');


module.exports = async (meetingId) => {

    const returnedMeetingObj = await client.query(`
    UPDATE meetings
    SET published = true
    WHERE id = $1
    RETURNING *`,
        [meetingId]);

    const meetingObj = returnedMeetingObj.rows[0];

    if (meetingObj.chat_url) {
        await insertNewChat(meetingObj, meetingId);
    }

    if (meetingObj.transcript_url) {
        await insertNewTranscript(meetingObj, meetingId);
    }

    return meetingObj;
}
