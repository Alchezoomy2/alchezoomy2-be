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
}