const client = require('../client.js');

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

    console.log(returnedChatObj.rows);

    const returnedTranscriptObj = await client.query(`
    DELETE from transcripts
    WHERE meeting_id = $1
    RETURNING *`,
        [meetingId]);

    console.log(returnedTranscriptObj.rows)

    return meetingObj;
}
