const client = require('../client.js');

module.exports = async (studentId) => {

    const returnedObject = await client.query(
        `SELECT 
            chat_id,
            comment,
            display_time,
            bookmarks.id,
            meeting_id,
            parsed_timestamp,
            pic_url,
            speaker,
            text,
            timestamp,
            topic,
            user_name
        FROM bookmarks
        LEFT JOIN chats
        ON bookmarks.chat_id = chats.id
        LEFT JOIN  meetings
        ON chats.meeting_id = meetings.id
        WHERE student_id = $1`,
        [studentId]
    );

    return returnedObject.rows;
}