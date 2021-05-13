const client = require('../client.js');

module.exports = class Bookmark {
    id;
    chatId;
    transcriptId;
    studentId;
    comment;
    color;
    comment;
    displayTime;
    meetingId;
    parsedTimestamp;
    picUrl;
    speaker;
    text;
    timestamp;
    topic;
    userName;

    constructor(row) {
        this.id = row.id;
        this.chatId = row.chat_id;
        this.transcriptId = row.transcript_id;
        this.studentId = row.student_id;
        this.comment = row.comment;
        this.color = row.color;
        this.displayTime = row.display_time;
        this.meetingId = row.meeting_id;
        this.parsedTimestamp = row.parsed_timestamp;
        this.picUrl = row.pic_url;
        this.speaker = row.speaker;
        this.text = row.text;
        this.timestamp = row.timestamp;
        this.topic = row.topic;
        this.userName = row.user_name;
    }

    static async insert(bookmarkObj, studentId) {
        await client.query(
            `INSERT INTO bookmarks
            (
                chat_id,
                transcript_id,
                student_id,
                comment
            )
            VALUES
            ($1, $2, $3, $4)`,
            [
                bookmarkObj.chatId,
                bookmarkObj.transcriptId,
                studentId,
                bookmarkObj.comment
            ]
        );
    }

    static async findAll(studentId) {

        const { rows } = await client.query(
            `SELECT 
                chat_id,
                transcript_id,
                color,
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
            LEFT JOIN teachers
                ON meetings.teacher_id = teachers.id
            WHERE student_id = $1
            AND chat_id IS NOT NULL
            AND meetings.id IS NOT NULL
            UNION ALL
                SELECT 
                chat_id,
                transcript_id,
                color,
                comment,
                display_time,
                bookmarks.id,
                meeting_id,
                time_start,
                pic_url,
                speaker,
                text,
                timestamp,
                topic,
                user_name
            FROM bookmarks
            LEFT JOIN transcripts
                ON bookmarks.transcript_id = transcripts.id
            LEFT JOIN  meetings
                ON transcripts.meeting_id = meetings.id
            LEFT JOIN teachers
                ON meetings.teacher_id = teachers.id
            WHERE student_id = $1 
            AND transcript_id IS NOT NULL
            AND meetings.id IS NOT NULL`,
            [studentId]
        );

        return rows.map(bookmark => new Bookmark(bookmark));
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
