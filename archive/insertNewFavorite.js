const client = require('../client.js');

module.exports = async (favoriteObj) => {

    await client.query(
        `INSERT INTO favorites
        (
            meeting_id,
            student_id,
            comment
        )
        VALUES
        ($1, $2, $3)`,
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

}