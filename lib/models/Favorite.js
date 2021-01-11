const client = require('../client.js');

module.exports = class Favorite {
    id;
    meeting_id;
    student_id;
    comment;

    constructor(row) {
        this.id = row.id;
        this.meeting_id = row.meeting_id;
        this.student_id = row.student_id;
        this.comment = row.comment;
    }

    static async insert(favoriteObj) {
        const { rows } = await client.query(
            `INSERT INTO favorites
            (
                meeting_id,
                student_id,
                comment
            )
            VALUES
            ($1, $2, $3)
            RETURNING *`,
            [
                favoriteObj.meetingId,
                favoriteObj.studentId,
                favoriteObj.comment
            ]
        );

        await client.query(
            `UPDATE meetings
            SET meeting_favs = meeting_favs + 1
            WHERE id = $1`,
            [favoriteObj.meetingId]
        )
        return new Favorite(rows[0])
    }

    static async findAll(studentId) {
        const returnedFavorites = await client.query(
            `SELECT
            meeting_id,
            comment,
            display_time,
            favorites.id,
            pic_url,
            topic,
            user_name
        FROM favorites
        LEFT JOIN meetings
            ON favorites.meeting_id = meetings.id
        WHERE student_id = $1
        AND meetings.id IS NOT NULL`,
            [studentId]
        );

        return returnedFavorites.rows;
    }

    static async delete(favoriteId) {
        const { rows } = await client.query(
            `DELETE FROM favorites
            WHERE id = $1
            RETURNING *`,
            [favoriteId]
        );

        await client.query(
            `UPDATE meetings
            SET meeting_favs = meeting_favs - 1
            WHERE id = $1`,
            [rows[0].meeting_id]

        )

        return new Favorite(rows[0])
    }

}
