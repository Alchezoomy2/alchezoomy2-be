const client = require('../client.js');


module.exports = async (meetingId) => {

    const meetingObj = await client.query(`
    SELECT *
    FROM meetings
    WHERE id = $1   
    `, [meetingId])

    const chatArray = await client.query(`
    SELECT *
    FROM chats
    WHERE meeting_id = $1
    ORDER BY id
    `, [meetingId]);

    const transcriptArray = await client.query(`
    SELECT *
    FROM transcripts
    WHERE meeting_id = $1
    ORDER BY id
    `, [meetingId]);

    return {
        meeting: meetingObj.rows,
        chat: chatArray.rows,
        transcript: transcriptArray.rows
    }
}
