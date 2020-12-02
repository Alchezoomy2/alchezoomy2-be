const client = require('../client.js');
const insertNewTranscript = require('./insertNewTranscript.js');
const insertNewChat = require('./insertNewChat');


module.exports = async (meetingId) => {
    console.log('publishMeeting.js');

    const returnedMeetingObj = await client.query(`
    UPDATE meetings
    SET published = true
    WHERE id = $1
    RETURNING *
    `, [meetingId]);

    const meetingObj = returnedMeetingObj.rows[0];
    console.log(meetingObj.chat_download_url)
    if (meetingObj.chat_download_url != '') {
        await insertNewChat(meetingObj, meetingId);
    }

    if (meetingObj.transcript_download_url != '') {
        await insertNewTranscript(meetingObj, meetingId);
    }

    return meetingObj;
}
