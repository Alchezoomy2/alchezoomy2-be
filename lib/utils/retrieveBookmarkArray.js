const client = require('../client.js');

module.exports = async (studentId) => {

    const returnedObject = await client.query(
        `SELECT *
        FROM bookmarks
        LEFT JOIN chats
        ON bookmarks.chat_id = chats.id
        LEFT JOIN  meetings
        ON chats.meeting_id = meetings.id
        WHERE student_id = $1`,
        [studentId]
    );

    console.log(returnedObject.rows)
    if (returnedObject.rows) {
        return returnedObject.rows
    }
    return [];
}