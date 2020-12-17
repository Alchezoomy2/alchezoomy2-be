const client = require('../client.js');


module.export = async (meetingId) => {
    console.log('retrieveMeetingDetails')
    console.log(meetingId)
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
        chat: chatArray.rows,
        transcript: transcriptArray.rows
    }



}
