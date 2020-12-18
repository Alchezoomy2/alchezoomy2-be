const client = require('../client.js');


module.exports = async (meetingId) => {

    const meetingObj = await client.query(`
    SELECT 1
    FROM meetings
    WHERE id = $1   
    `, [meetingId])

    const chatArray = await client.query(`
    SELECT *
    FROM chats
    WHERE meeting_id = $1
    ORDER BY id
    `, [meetingId]);

    console.log(chatArray.rows)

    const transcriptArray = await client.query(`
    SELECT *
    FROM transcripts
    WHERE meeting_id = $1
    ORDER BY id
    `, [meetingId]);

    console.log(transcriptArray.rows)


    return {
        meeting: meetingObj.rows,
        chat: chatArray.rows,
        transcript: transcriptArray.rows
    }
}
