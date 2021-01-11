const client = require('../client.js');

module.exports = class Bookmark {
    id;
    chat_id;
    student_id;
    comment;

    constructor(row) {
        this.id = row.id;
        this.chat_id = row.chat_id;
        this.student_id = row.student_id;
        this.comment = row.comment;
    }

    static async insert(bookmarkObj) {
        console.log(bookmarkObj)
        const { rows } = await client.query(
            `INSERT INTO bookmarks
            (
                chat_id,
                student_id,
                comment
            )
            VALUES
            ($1, $2, $3)`,
            [
                bookmarkObj.chatId,
                bookmarkObj.studentId,
                bookmarkObj.comment
            ]
        );
        console.log(rows[0])
        return new Bookmark(rows[0]);
    }

    static async findAll(studentId) {
        console.log(studentId)
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
            WHERE student_id = $1
            AND meetings.id IS NOT NULL`,
            [studentId]
        );

        return returnedObject.rows;
    }

    static async delete(bookmarkId) {

        const { rows } = await client.query(
            `DELETE FROM bookmarks
            WHERE id = $1
            RETURNING *`,
            [bookmarkId]);

        return new Bookmark(rows[0])
    }
}
