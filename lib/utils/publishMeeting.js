const client = require('../client.js');
const insertNewTranscript = require('./insertNewTranscript.js');
const insertNewChat = require('./insertNewChat');
const sendToS3 = require('./sendToS3.js');


module.exports = async (meetingId, accessToken) => {

    const returnedMeetingObj = await client.query(`
    UPDATE meetings
    SET published = true
    WHERE id = $1
    RETURNING *`,
        [meetingId]);

    const meetingObj = returnedMeetingObj.rows[0];

    if (meetingObj.video_url) {
        const videoPath = `${meetingObj.teacher_id}/${meetingObj.id}.mp4`;
        await sendToS3(videoPath, meetingObj.video_url, accessToken);
    }

    if (meetingObj.chat_url) {
        await insertNewChat(meetingObj, meetingId, accessToken);
    }

    if (meetingObj.transcript_url) {
        await insertNewTranscript(meetingObj, meetingId, accessToken);
    }

    return meetingObj;
}
