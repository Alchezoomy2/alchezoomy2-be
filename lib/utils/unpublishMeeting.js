const client = require('../client.js');
const deleteFromS3 = require('./deleteFromS3.js');

module.exports = async (meetingId) => {



    const returnedMeetingObj = await client.query(`
    UPDATE meetings
    SET published = false
    WHERE id = $1
    RETURNING *
    `, [meetingId]);
    const meetingObj = returnedMeetingObj.rows[0];

    const returnedChatObj = await client.query(`
    DELETE from chats
    WHERE meeting_id = $1
    RETURNING *`,
        [meetingId]);

    const returnedTranscriptObj = await client.query(`
    DELETE from transcripts
    WHERE meeting_id = $1
    RETURNING *`,
        [meetingId]);

    const videoPath = `videos/${meetingObj.teacher_id}/${meetingObj.id}.mp4`;
    await deleteFromS3(videoPath);

    return meetingObj;
}
