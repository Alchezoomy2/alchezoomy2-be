

module.export = (meetingId) => {

    const chatArray = client.query(`
    SELECT *
    FROM chats
    WHERE meeting_id = $1
    ORDER BY id
    `, [meetingId]);

    const transcriptArray = client.query(`
    SELECT *
    FROM transcripts
    WHERE meeting_id = $1
    ORDER BY id
    `, [meetingId]);

    return {
        chat: chatArray.rows,
        transcript: transcriptArray.rows
    }



}